import React, { useEffect, useState } from "react";
import { Modal, Carousel, Button } from "react-bootstrap";
import { api } from "../../apis/api";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import CommentList from "../CommentList/CommentList";
import toast from "react-hot-toast";

const PostModal = ({ show, handleClose, post, currentUserId, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(post);
  const baseUrl = baseUrlHandler();

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/api/v1/posts/${currentPost._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentPost(prev => {
        const likedByUser = response.data.likedByUser;
        let newLikes = [...(prev.likes || [])];

        if (likedByUser) {
          if (!newLikes.includes(currentUserId)) newLikes.push(currentUserId);
        } else {
          newLikes = newLikes.filter(id => id !== currentUserId);
        }

        return { ...prev, likes: newLikes };
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function handleDeletePost() {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/v1/posts/${currentPost._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(prevPosts => {
        return prevPosts.filter(post => post._id !== currentPost._id);
      });

      handleClose();
      onDelete(currentPost._id);
      toast.success("Post deleted successfully");

    } catch (err) {
      console.log(err);
    }
  }

  if (!currentPost) return null;

  const isLiked = currentPost.likes?.includes(currentUserId);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Post</Modal.Title>
        <Button
          variant="danger"
          onClick={() => handleDeletePost(true)}
          className="ms-auto"
        >
          Delete
        </Button>
        
      </Modal.Header>

      <Modal.Body>
        <Carousel className="mb-3">
          {currentPost.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={`${baseUrl}/${img}`}
                alt={`Slide ${idx + 1}`}
                className="d-block w-100"
                style={{ maxHeight: "700px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="d-flex align-items-center gap-2 mb-2">
          <Button
            variant={isLiked ? "danger" : "outline-danger"}
            onClick={handleLike}
          >
            ❤️ {isLiked ? "Unlike" : "Like"}
          </Button>
          <span>{currentPost.likes?.length || 0} Likes</span>
        </div>

        <p>{currentPost.caption}</p>

        <CommentList post={currentPost} />
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;