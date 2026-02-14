// import React, { useState, useEffect } from 'react';
// import { errorHandler } from '../../utils/errorHandler';
// import { api } from '../../apis/api';
// // import CreateNewPost from '../../components/createNewPost/createNewPost';
// import CreateNewPost from '../../components/CreateNewPost/CreateNewPost';
// import FeedsPosts from '../../components/FeedsPosts/FeedsPosts';

// export const Home = () => {
//   const [posts, setPosts] = useState([]);

//   // fetch posts once
//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const response = await api.get("/api/v1/posts");
//         setPosts(response.data.posts);
//       } catch (error) {
//         errorHandler(error);
//       }
//     }
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <CreateNewPost posts={posts} setPosts={setPosts} />
//       <h3>Feeds</h3>
//       <FeedsPosts posts={posts} />
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import CreateNewPost from '../../components/CreateNewPost/CreateNewPost';
import FeedsPosts from '../../components/FeedsPosts/FeedsPosts';

export const Home = () => {
  const [posts, setPosts] = useState([]);

  // fetch posts once
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/api/v1/posts");
        setPosts(response.data.posts);
      } catch (error) {
        errorHandler(error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <CreateNewPost posts={posts} setPosts={setPosts} />
      <h3 className="text-center mt-3 mb-3 text-2xl font-bold text-gray-900"> Feeds </h3>
      <FeedsPosts posts={posts} />
    </div>
  )
}