// import React, {  useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { baseUrlHandler } from '../../utils/baseUrlHandler';
// import { VscEdit } from "react-icons/vsc";
// import { FiEdit } from 'react-icons/fi';
// import { errorHandler } from '../../utils/errorHandler';
// import toast from 'react-hot-toast';
// import { api } from '../../apis/api';
// import { Button, Form, Modal } from 'react-bootstrap';
// import { setUser } from '../../store/slices/userSlice';



// const Profile = () => {
//   const {user} = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [show , setShow] = useState(false);
//   const handelClose = () => setShow(false);
//   const handelShow = () => setShow(true);
//   const formRef = useRef()
//   const [file, setFile] = useState(undefined); 

//   console.log(user)

//   const baseUrl = baseUrlHandler();

//   async function handleProfileImageChange(event) {
//     event.preventDefault();
//   try {
//     // Create File Input Element
//     const formData = new FormData();
//     // console.log(formRef.current.files[0])
//     formData.append("image", file);

//     // Get Token
//     const token = localStorage.getItem("token");


//     //  call api to update profile image
//     const response = await api.put("/api/v1/user/profile/update", formData , {
//             // Hint: back -> authorization
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//     const {profileImage , message} = response.data;
//           // Update User Data in Redux Store
//           dispatch(setUser({ ...user, profileImage }));
//     toast.success(message);

//     handelClose();

  
//   } catch (error) {
//     errorHandler(error);
//     toast.error("Failed to update profile image. Please try again."); 
//   }


//     // bio
//     // async function handleBioChange() {
//     //   try {
//     //     // Get Token
//     //     const token = localStorage.getItem("token");
//     //     //  call api to update profile image
//     //     const response = await api.put("/api/v1/user/profile/update",  {  name: user.username, bio: user.bio } , {
//     //             // Hint: back -> authorization
//     //             headers: {
//     //               Authorization: `Bearer ${token}`,
//     //             },
//     //           });
//     //           console.log(response)
  
//     //     const {  name , bio , message} = response.data;
//     //           // Update User Data in Redux Store
//     //           dispatch(setUser({ ...user, name , bio }));
//     //     toast.success(message);
        
//     //   } catch (error) {
//     //     errorHandler(error);
//     //     toast.error("Failed to update profile. Please try again."); 
//     //   }
      

//     // }  

  
// }
//   return (
//   <>
//     <Modal show={show} onHide={handelClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Profile Image</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Label htmlFor='profilePic'>Select a new profile image</Form.Label>
//               <Form.Control 
//               onChange={(e) => setFile(e.target.files[0])}
//               ref={formRef} 
//               type="file"
//              id='profilePic' />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="btn btn-secondary" onClick={handelClose}>
//             Close
//           </Button>

//           <Button disabled ={file === undefined}  className="btn btn-primary"  onClick={handleProfileImageChange }>
//             Update Image
//           </Button>
//         </Modal.Footer>
//       </Modal>
    

//     <div
//       className="container mt-5 mb-5 text-center p-5 bg-light shadow rounded"
//       style={{ maxWidth: "800px" }}
//     >
//       <h1 className="mb-3">Profile Page</h1>
//       <p className="text-muted mb-4">
//         This is the profile page. You can view and edit your profile information here.
//       </p>

//       {/* Profile Image */}
//       <div className="d-flex justify-content-center mb-4">
//         <div className="position-relative d-inline-block">
//           <img
//             src={`${baseUrl}/${user.profileImage}`}
//             alt="Profile"
//             className="rounded-circle border"
//             width="150"
//             height="150"
//             style={{ objectFit: "cover" }}
//           />

//           {/* Edit Icon */}
//           <div
//             className=" translate-middle position-absolute bottom-0 end-0 translate-middle bg-primary rounded-circle d-flex align-items-center justify-content-center shadow"
//             style={{ width: "30px", height: "30px" , cursor: "pointer" }}
//             onClick={handelShow}
//           >
//             <FiEdit className="text-white fs-5" />
//           </div>
//         </div>
//       </div>

//       {/* User Info */}
//       <div className="mb-4">
//         <h4 className="fw-bold mb-1">{user.username}</h4>
//         {user.bio && <p className="text-muted mb-0">{user.bio}</p>}
//       </div>

      
//     </div>

//   </>
// );
// }

// export default Profile

 




import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setUser } from "../../store/slices/userSlice";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { errorHandler } from "../../utils/errorHandler";
import PostModal from "../../components/PostModal/PostModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Profile image modal
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(undefined);
  const formRef = useRef();

  // Edit profile modal (username + bio)
  const [editModal, setEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");

  // Posts
  const [posts, setPosts] = useState([]);

  // Post modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const baseUrl = baseUrlHandler();

  // Synchronize local edit state with store user
  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
      setNewBio(user.bio || "");
    }
  }, [user]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEditModalShow = () => setEditModal(true);
  const handleEditModalClose = () => setEditModal(false);

  const openPostModal = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };
  const closePostModal = () => {
    setSelectedPost(null);
    setShowPostModal(false);
  };

  // Fetch user posts
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

  // Update profile image
  async function handleProfileImageChange(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const response = await api.put(
        "/api/v1/user/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { profileImage, message } = response.data;

      dispatch(setUser({ ...user, profileImage }));
      toast.success(message);

      setFile(undefined);
      handleClose();
    } catch (error) {
      errorHandler(error);
      toast.error("Failed to update profile image.");
    }
  }

  // Update username and bio
  async function handleProfileUpdate(e) {
    e.preventDefault();

    // Optimistic update: تحديث الـ UI فورًا
    dispatch(setUser({ ...user, username: newUsername, bio: newBio }));

    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        "/api/v1/user/profile/update",
        { name: newUsername, bio: newBio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { username, bio, message } = response.data;

      // تأكيد تحديث الـ store بالقيم الصحيحة من الـ backend
      dispatch(setUser({ ...user, username, bio }));
      toast.success(message);
      handleEditModalClose();
    } catch (error) {
      errorHandler(error);
      toast.error("Failed to update profile.");
    }
  }

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
              <Form.Control
                type="file"
                ref={formRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!file}
            onClick={handleProfileImageChange}
          >
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
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
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
        />
      )}

      {/* Instagram Style Profile */}
      <div className="container mt-5">
        <div className="row align-items-center">
          {/* Profile Image */}
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
                onClick={handleShow}
              >
                <FiEdit className="text-white" />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="mb-0">{user.username}</h3>
              <Button
                variant="outline-dark"
                size="sm"
                onClick={handleEditModalShow}
              >
                Edit Profile
              </Button>
            </div>

            <div className="d-flex gap-4 mb-3">
              <div>
                <strong>{posts.length}</strong> posts
              </div>
              <div>
                <strong>0</strong> followers
              </div>
              <div>
                <strong>0</strong> following
              </div>
            </div>

            {user.bio && <p className="mb-1">{user.bio}</p>}
          </div>
        </div>

        <hr className="my-4" />

        {/* Posts Grid */}
        <div className="row mt-4">
          {posts.length > 0 ? (
            posts.map((post) =>
              post.images.map((img, idx) => (
                <div className="col-4 p-1" key={post._id + idx}>
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => openPostModal(post)}
                  >
                    <img
                      src={`${baseUrl}/${img}`}
                      alt="Post"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))
            )
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
