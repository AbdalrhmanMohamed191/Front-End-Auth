import React, { useEffect, useState } from 'react'
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import PostCard from '../PostCard/PostCard';

const FeedsPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        // Fetch posts from the server or API
        async function fetchPosts() {
            try {
                const response = await api.get("/api/v1/posts");
                // console.log(response.data.posts);
                setPosts(response.data.posts);
                
            } catch (error) {
                console.log(error)
                errorHandler(error);
            }
        }
        
       fetchPosts();
    }, []);
   return (
    <div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default FeedsPosts



// import React from 'react';
// import PostCard from '../PostCard/PostCard';

// const FeedsPosts = ({ posts }) => {
//   return (
//     <div>
//       {posts.map(post => (
//         <PostCard key={post._id} post={post} />
//       ))}
//     </div>
//   )
// }

// export default FeedsPosts;
