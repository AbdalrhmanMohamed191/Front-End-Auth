import React from 'react'
import { useSelector } from 'react-redux';
import { baseUrlHandler } from '../../utils/baseUrlHandler';


const Profile = () => {
  const {user} = useSelector((state) => state.user);
  console.log(user)

  const baseUrl = baseUrlHandler();
  
  return (
    <>
    <div className="container mt-5 mb-5 text-center p-5 bg-light shadow rounded" style={{ maxWidth: "600px" }} >
      <h1>Profile Page</h1>
      <p>This is the profile page. You can view and edit your profile information here.</p>
      <div className="mb-3">
        <div className="mb-3" ></div> 
      
     
  <img
    src={`${baseUrl}/${user.profileImage}`}
    alt="Profile"
    className="rounded-circle"
    style={{ width: "150px", height: "150px", objectFit: "cover" }}
  />

      </div>
      <div className="mb-4">
        <h3> {user.username}</h3>
        {user.bio && <p className='m-0'>{user.bio}</p>}
      </div>
      <button className="btn btn-primary">Edit Profile</button>
    </div>

    </>
  )
}

export default Profile
