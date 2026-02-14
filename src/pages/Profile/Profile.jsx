import React, {  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseUrlHandler } from '../../utils/baseUrlHandler';
import { VscEdit } from "react-icons/vsc";
import { FiEdit } from 'react-icons/fi';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import { api } from '../../apis/api';
import { Button, Form, Modal } from 'react-bootstrap';
import { setUser } from '../../store/slices/userSlice';



const Profile = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show , setShow] = useState(false);
  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);
  const formRef = useRef()
  const [file, setFile] = useState(undefined); 

  console.log(user)

  const baseUrl = baseUrlHandler();

  async function handleProfileImageChange(event) {
    event.preventDefault();
  try {
    // Create File Input Element
    const formData = new FormData();
    // console.log(formRef.current.files[0])
    formData.append("image", file);

    // Get Token
    const token = localStorage.getItem("token");


    //  call api to update profile image
    const response = await api.put("/api/v1/user/profile/update", formData , {
            // Hint: back -> authorization
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

    const {profileImage , message} = response.data;
          // Update User Data in Redux Store
          dispatch(setUser({ ...user, profileImage }));
    toast.success(message);

    handelClose();

  
  } catch (error) {
    errorHandler(error);
    toast.error("Failed to update profile image. Please try again."); 
  }


    // bio
    // async function handleBioChange() {
    //   try {
    //     // Get Token
    //     const token = localStorage.getItem("token");
    //     //  call api to update profile image
    //     const response = await api.put("/api/v1/user/profile/update",  {  name: user.username, bio: user.bio } , {
    //             // Hint: back -> authorization
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           });
    //           console.log(response)
  
    //     const {  name , bio , message} = response.data;
    //           // Update User Data in Redux Store
    //           dispatch(setUser({ ...user, name , bio }));
    //     toast.success(message);
        
    //   } catch (error) {
    //     errorHandler(error);
    //     toast.error("Failed to update profile. Please try again."); 
    //   }
      

    // }  

  
}
  return (
  <>
    <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label htmlFor='profilePic'>Select a new profile image</Form.Label>
              <Form.Control 
              onChange={(e) => setFile(e.target.files[0])}
              ref={formRef} 
              type="file"
             id='profilePic' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={handelClose}>
            Close
          </Button>

          <Button disabled ={file === undefined}  className="btn btn-primary"  onClick={handleProfileImageChange }>
            Update Image
          </Button>
        </Modal.Footer>
      </Modal>
    

    <div
      className="container mt-5 mb-5 text-center p-5 bg-light shadow rounded"
      style={{ maxWidth: "800px" }}
    >
      <h1 className="mb-3">Profile Page</h1>
      <p className="text-muted mb-4">
        This is the profile page. You can view and edit your profile information here.
      </p>

      {/* Profile Image */}
      <div className="d-flex justify-content-center mb-4">
        <div className="position-relative d-inline-block">
          <img
            src={`${baseUrl}/${user.profileImage}`}
            alt="Profile"
            className="rounded-circle border"
            width="150"
            height="150"
            style={{ objectFit: "cover" }}
          />

          {/* Edit Icon */}
          <div
            className=" translate-middle position-absolute bottom-0 end-0 translate-middle bg-primary rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{ width: "30px", height: "30px" , cursor: "pointer" }}
            onClick={handelShow}
          >
            <FiEdit className="text-white fs-5" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">{user.username}</h4>
        {user.bio && <p className="text-muted mb-0">{user.bio}</p>}
      </div>

      
    </div>

  </>
);
}

export default Profile

 


