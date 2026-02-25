// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { api } from "../../apis/api";
// import { Button } from "react-bootstrap";
// import { baseUrlHandler } from "../../utils/baseUrlHandler";
// import { errorHandler } from "../../utils/errorHandler";
// import PostModal from "../../components/PostModal/PostModal";

// const UserProfile = () => {

//   const { id } = useParams(); // userId للشخص
//   const { user } = useSelector((state) => state.user); // انت الحالي
//   const navigate = useNavigate();
//   const baseUrl = baseUrlHandler();

//   const [profileUser, setProfileUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [followingCount, setFollowingCount] = useState(0);

//   const isMyProfile = id === user?._id;

//   // Fetch profile user
//   useEffect(() => {
//     async function fetchProfileUser() {
//       try {
//         const res = await api.get(`/api/v1/user/${id}`);
//         const u = res.data.user;
//         setProfileUser(u);
//         setFollowersCount(u.followers?.length || 0);
//         setFollowingCount(u.following?.length || 0);
//         setIsFollowing(u.followers?.includes(user._id));
//       } catch (err) {
//         errorHandler(err);
//       }
//     }
//     fetchProfileUser();
//   }, [id, user]);

//   // Fetch user posts
//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const res = await api.get(`/api/v1/posts/user/${id}`);
//         setPosts(res.data.posts);
//       } catch (err) {
//         errorHandler(err);
//       }
//     }
//     fetchPosts();
//   }, [id]);

//   const handleFollow = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const url = isFollowing
//         ? `/api/v1/user/${id}/unfollow`
//         : `/api/v1/user/${id}/follow`;

//       const res = await api.patch(url, {}, { headers: { Authorization: `Bearer ${token}` } });

//       setIsFollowing(!isFollowing);
//       setFollowersCount(res.data.followersCount || (isFollowing ? followersCount - 1 : followersCount + 1));
//     } catch (err) {
//       errorHandler(err);
//     }
//   };

//   if (!profileUser) return <p>Loading...</p>;

//   return (
//     <div className="container mt-5">
//       {/* Profile Header */}
//       <div className="row align-items-center mb-4">
//         <div className="col-md-4 text-center">
//           <img
//             // src={`${baseUrl}/${profileUser.profileImage}`}
//              src={
//     profileUser.profileImage.startsWith("http")
//       ? profileUser.profileImage
//       : baseUrlHandler(profileUser.profileImage)
//   }
//             alt="profile"
//             className="rounded-circle border"
//             width="180"
//             height="180"
//             style={{ objectFit: "cover", cursor: "pointer" }}
//             onClick={() => {
//               if (!isMyProfile) navigate(`/user/${profileUser._id}`);
//             }}
//           />
//         </div>
//         <div className="col-md-8">
//           <h3>{profileUser.username}</h3>
//           <div className="d-flex gap-3 mb-2">
//             {isMyProfile ? (
//               <Button variant="outline-dark" size="sm">
//                 Edit Profile
//               </Button>
//             ) : (
//               <Button
//                 variant={isFollowing ? "outline-secondary" : "dark"}
//                 size="sm"
//                 onClick={handleFollow}
//               >
//                 {isFollowing ? "Unfollow" : "Follow"}
//               </Button>
//             )}
//           </div>
//           <div className="d-flex gap-4">
//             <div><strong>{posts.length}</strong> posts</div>
//             <div
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate(`/user/${profileUser._id}/connections?tab=followers`)}
//             >
//               <strong>{followersCount}</strong> followers
//             </div>
//             <div
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate(`/user/${profileUser._id}/connections?tab=following`)}
//             >
//               <strong>{followingCount}</strong> following
//             </div>
//           </div>
//           {profileUser.bio && <p className="mt-2">{profileUser.bio}</p>}
//         </div>
//       </div>

//       <hr />

//       {/* Posts Grid */}
// <div className="row mt-4">
//   {posts.length > 0 ? (
//     posts.map((post) => (
//       <div
//         className="col-4 p-1"
//         key={post._id}
//         onClick={() => { setSelectedPost(post); setShowPostModal(true); }}
//         style={{ cursor: "pointer" }}
//       >
//         <div
//           style={{
//             width: "100%",
//             paddingBottom: "100%", // يحافظ على aspect ratio مربع
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* أول صورة كـ preview */}
//           <img
//             // src={`${baseUrl}/${post.images[0]}`}
//              src={
//     post.images[0].startsWith("http")
//       ? post.images[0]
//       : baseUrlHandler(post.images[0])
//              }
//             alt="Post"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />

//           {/* Badge لو فيه أكثر من صورة */}
//           {post.images.length > 1 && (
//             <span
//               style={{
//                 position: "absolute",
//                 top: "8px",
//                 right: "8px",
//                 background: "rgba(0,0,0,0.6)",
//                 color: "#fff",
//                 fontSize: "12px",
//                 padding: "2px 6px",
//                 borderRadius: "4px",
//               }}
//             >
//               📚 {post.images.length}
//             </span>
//           )}
//         </div>
//       </div>
//     ))
//   ) : (
//     <div className="text-center text-muted w-100"><h5>No Posts Yet</h5></div>
//   )}


//         {isMyProfile && (
//           navigate('/profile')
//         )}
        

//       </div>
    
//       {/* Post Modal */}
//       {selectedPost && (
//         <PostModal
//           show={showPostModal}
//           handleClose={() => setShowPostModal(false)}
//           post={selectedPost}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfile;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../apis/api";
import { Button } from "react-bootstrap";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { errorHandler } from "../../utils/errorHandler";
import PostModal from "../../components/PostModal/PostModal";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const baseUrl = baseUrlHandler();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const isMyProfile = id === user?._id;

  // Fetch profile user
  useEffect(() => {
    async function fetchProfileUser() {
      try {
        const res = await api.get(`/api/v1/user/${id}`);
        const u = res.data.user;
        setProfileUser(u);
        setFollowersCount(u.followers?.length || 0);
        setFollowingCount(u.following?.length || 0);
        setIsFollowing(u.followers?.includes(user._id));
      } catch (err) {
        errorHandler(err);
      }
    }
    fetchProfileUser();
  }, [id, user]);

  // Fetch user posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get(`/api/v1/posts/user/${id}`);
        setPosts(res.data.posts);
      } catch (err) {
        errorHandler(err);
      }
    }
    fetchPosts();
  }, [id]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = isFollowing
        ? `/api/v1/user/${id}/unfollow`
        : `/api/v1/user/${id}/follow`;

      const res = await api.patch(url, {}, { headers: { Authorization: `Bearer ${token}` } });

      setIsFollowing(!isFollowing);
      setFollowersCount(
        isFollowing ? followersCount - 1 : followersCount + 1
      );
    } catch (err) {
      errorHandler(err);
    }
  };

  if (!profileUser) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="row align-items-center mb-4">
        <div className="col-md-4 text-center">
          <img
            // src={profileUser.profileImage.startsWith("http")? profileUser.profileImage: baseUrlHandler(profileUser.profileImage) }
            src={profileUser.profileImage.startsWith("http") ? profileUser.profileImage : `${baseUrl}/${profileUser.profileImage}`}
            alt="profile"
            className="rounded-circle border"
            width="180"
            height="180"
            style={{ objectFit: "cover", cursor: "pointer" }}
            onClick={() => {
              if (!isMyProfile) navigate(`/profile/${profileUser._id}`);
            }}
          />
        </div>
        <div className="col-md-8">
          <h3>{profileUser.username}</h3>
          <div className="d-flex gap-3 mb-2">
            {isMyProfile ? (
              <Button variant="outline-dark" size="sm">
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outline-secondary" : "dark"}
                size="sm"
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
          <div className="d-flex gap-4">
            <div><strong>{posts.length}</strong> posts</div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/user/${profileUser._id}/connections?tab=followers`)}
            >
              <strong>{followersCount}</strong> followers
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/user/${profileUser._id}/connections?tab=following`)}
            >
              <strong>{followingCount}</strong> following
            </div>
          </div>
          {profileUser.bio && <p className="mt-2">{profileUser.bio}</p>}
        </div>
      </div>

      <hr />

      {/* Posts Grid */}
      <div className="row mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="col-4 p-1"
              key={post._id}
              onClick={() => { setSelectedPost(post); setShowPostModal(true); }}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    post.images[0].startsWith("http")
                      ? post.images[0]
                      : `${baseUrl}/${post.images[0]}`
                  }
                  alt="Post"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
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
          <div className="text-center text-muted w-100"><h5>No Posts Yet</h5></div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          show={showPostModal}
          handleClose={() => setShowPostModal(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default UserProfile;