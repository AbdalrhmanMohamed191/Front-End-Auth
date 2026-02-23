import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setUser } from "../../store/slices/userSlice";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import PostModal from "../../components/PostModal/PostModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [file, setFile] = useState(undefined);
  const formRef = useRef();

  const [editModal, setEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const baseUrl = baseUrlHandler();

  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
      setNewBio(user.bio || "");
    }
  }, [user]);

  useEffect(() => {
    async function fetchUserPosts() {
      if (!user?._id) return;
      try {
        const response = await api.get(`/api/v1/posts/user/${user._id}`);
        setPosts(response.data.posts);
      } catch (error) {
        errorHandler(error);
      }
    }
    fetchUserPosts();
  }, [user]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleEditModalClose = () => setEditModal(false);

  const openPostModal = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };
  const closePostModal = () => {
    setSelectedPost(null);
    setShowPostModal(false);
  };

  async function handleProfileImageChange(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      const response = await api.put("/api/v1/user/profile/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser({ ...user, profileImage: response.data.profileImage }));
      toast.success(response.data.message);
      setFile(undefined);
      handleClose();
    } catch (error) {
      errorHandler(error);
      toast.error("Failed to update profile image.");
    }
  }

  async function handleProfileUpdate(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.patch(
        "/api/v1/user/profile/update",
        { name: newUsername, bio: newBio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setUser({ ...user, username: response.data.username, bio: response.data.bio }));
      toast.success(response.data.message);
      handleEditModalClose();
    } catch (error) {
      errorHandler(error);
      toast.error("Failed to update profile.");
    }
  }

  const handleDeletePost = (postId) => {
  setPosts(posts.filter(p => p._id !== postId));
};

  if (!user) return null;

  return (
    <>
      {/* Profile Image Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select new profile image</Form.Label>
              <Form.Control type="file" ref={formRef} onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" disabled={!file} onClick={handleProfileImageChange}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal show={editModal} onHide={handleEditModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleProfileUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          show={showPostModal}
          handleClose={closePostModal}
          post={selectedPost}
          onDelete={handleDeletePost} // 
        />
      )}

      {/* Profile Info */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4">
            <div className="position-relative d-inline-block">
              <img
                src={`${baseUrl}/${user.profileImage}`}
                alt="Profile"
                className="rounded-circle border"
                width="180"
                height="180"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute bottom-0 end-0 bg-dark rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ width: "35px", height: "35px", cursor: "pointer" }}
                onClick={() => setShow(true)}
              >
                <FiEdit className="text-white" />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="mb-0">{user.username}</h3>
              <Button variant="outline-dark" size="sm" onClick={() => setEditModal(true)}>
                Edit Profile
              </Button>
            </div>
            <div className="d-flex gap-4 mb-3">
              <div>
                <strong>{posts.length}</strong> posts
              </div>
              <div style={{ cursor: "pointer" }} onClick={() => navigate(`/user/${user._id}/connections?tab=followers`)}>
                <strong>{user.followers?.length || 0}</strong> followers
              </div>
              <div style={{ cursor: "pointer" }} onClick={() => navigate(`/user/${user._id}/connections?tab=following`)}>
                <strong>{user.following?.length || 0}</strong> following
              </div>
            </div>
            {user.bio && <p className="mb-1">{user.bio}</p>}
          </div>
        </div>

        <hr className="my-4" />

        {/* Posts Grid */}
        <div className="row mt-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="col-4 p-1" key={post._id}>
                <div
                  style={{ width: "100%", paddingBottom: "100%", position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: "8px" }}
                  onClick={() => openPostModal(post)}
                >
                  <img
                    src={`${baseUrl}/${post.images[0]}`}
                    alt="Post"
                    style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {post.images.length > 1 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      📚 {post.images.length}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted w-100">
              <h5>No Posts Yet</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;