import React, { useState, useEffect, useRef } from "react";
import { Modal, Image, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { api } from "../../apis/api";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import "./stories.css";

const socket = io("http://localhost:5000"); 

const Stories = () => {
  const { user: currentUser } = useSelector((state) => state.user);
  const baseUrl = baseUrlHandler();

  const [stories, setStories] = useState([]);
  const [modalStories, setModalStories] = useState([]);
  const [modalUserId, setModalUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const fetchStories = async () => {
    try {
      const res = await api.get("/api/v1/stories");
      const formatted = (res.data || []).map((s) => ({
        id: s._id,
        username: s.user?.username || "Unknown",
        userImage: s.user?.profileImage
          ? s.user.profileImage.startsWith("http")
            ? s.user.profileImage
            : `${baseUrl}/${s.user.profileImage}`
          : `${baseUrl}/default-avatar.png`,
        image: s?.image ? (s.image.startsWith("http") ? s.image.replace(/\/\/uploads/, "/uploads") : `${baseUrl}/${s.image}`) : "",
        userId: s.user?._id || null,
        seenBy: s.seenBy || [],
        createdAt: s.createdAt,
      }));

      const map = new Map();
      formatted.forEach((s) => {
        if (map.has(s.userId)) {
          map.get(s.userId).images.push({
            image: s.image,
            id: s.id,
            seenBy: s.seenBy,
            createdAt: s.createdAt,
          });
        } else {
          map.set(s.userId, {
            userId: s.userId,
            username: s.username,
            userImage: s.userImage,
            images: [{
              image: s.image,
              id: s.id,
              seenBy: s.seenBy,
              createdAt: s.createdAt,
            }],
          });
        }
      });

      setStories(Array.from(map.values()));
    } catch (err) {
      console.error(err);
    }
  };

  //  WebSocket 
  useEffect(() => {
    if (!currentUser?._id) return;
    fetchStories();
    socket.on("new-story", fetchStories);
    return () => socket.off("new-story");
  }, [currentUser]);

  // ===== Open modal =====
  const handleOpen = (userId) => {
    const userStory = stories.find((s) => s.userId === userId);
    if (!userStory) return;

    const sortedImages = [...userStory.images].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    setModalStories(sortedImages);
    setModalUserId(userId);
    setCurrentStoryIndex(0);
    setShowModal(true);

    markSeen(sortedImages[0].id);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalStories([]);
    setModalUserId(null);
    setCurrentStoryIndex(0);
    clearInterval(timerRef.current);
  };

  //  Handle Next & Prev 
  const handleNext = () => {
    if (currentStoryIndex < modalStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      markSeen(modalStories[currentStoryIndex + 1].id);
    } else handleClose();
  };
  const handlePrev = () => {
    if (currentStoryIndex > 0) setCurrentStoryIndex(currentStoryIndex - 1);
  };
  const handleClick = (e) => {
    const width = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    if (clickX < width / 2) handlePrev();
    else handleNext();
  };

  //  Mark Seen 
  const markSeen = async (storyId) => {
    try {
      await api.put(`/api/v1/stories/${storyId}/seen`, { userId: currentUser._id });
      fetchStories();
    } catch (err) {
      console.error(err);
    }
  };

  //  Auto next 
  useEffect(() => {
    if (!showModal) return;
    clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => handleNext(), 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [showModal, currentStoryIndex, modalStories, isPaused]);

  //  Add story 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await api.post("/api/v1/messages/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = uploadRes.data.url.startsWith("http")
        ? uploadRes.data.url.replace(/\/\/uploads/, "/uploads")
        : `${baseUrl}/${uploadRes.data.url}`;

      await api.post("/api/v1/stories", { image: imageUrl, user: currentUser._id });
      fetchStories();
    } catch (err) {
      console.error(err);
    }
  };

  //  Format time 
  const formatTime = (time) => {
    const now = new Date();
    const created = new Date(time);
    const diff = Math.floor((now - created) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
    return `${Math.floor(diff / 86400)} d ago`;
  };

  return (
    <>
      <div className="stories-container">
        {currentUser && (
          <div className="story-circle add-story">
            <Image
              src={currentUser.profileImage ? (currentUser.profileImage.startsWith("http") ? currentUser.profileImage : `${baseUrl}/${currentUser.profileImage}`) : `${baseUrl}/default-avatar.png`}
              roundedCircle
              onClick={() => handleOpen(currentUser._id)}
            />
            <span className="story-username">You</span>
            <Button className="story-add-btn" size="sm" onClick={() => document.getElementById("storyFile").click()}>+</Button>
            <input type="file" id="storyFile" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
          </div>
        )}

        {stories
          .filter(s => s.userId !== currentUser?._id)
          .map(story => {
            const hasSeen = story.images.every(img => img.seenBy.includes(currentUser._id));
            return (
              <div key={story.userId} className={`story-circle ${hasSeen ? "seen" : "unseen"}`} onClick={() => handleOpen(story.userId)}>
                <Image src={story.userImage} roundedCircle />
                <span className="story-username">{story.username}</span>
              </div>
            );
          })}
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="lg"
        dialogClassName="story-modal-dialog"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
      >
        <div className="story-modal" onClick={handleClick}>
          {modalStories[currentStoryIndex] && (
            <>
              <Image src={modalStories[currentStoryIndex].image} fluid alt="Story" />

              {/* Header: progress + time */}
              <div className="story-header">
                <div className="story-progress-container">
                  {modalStories.map((_, index) => (
                    <div
                      key={index}
                      className={`story-progress-bar ${
                        index < currentStoryIndex ? "filled" : index === currentStoryIndex ? "active" : ""
                      }`}
                    >
                      <div className="fill"></div>
                    </div>
                  ))}
                </div>
                <div className="story-time">{formatTime(modalStories[currentStoryIndex].createdAt)}</div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Stories;