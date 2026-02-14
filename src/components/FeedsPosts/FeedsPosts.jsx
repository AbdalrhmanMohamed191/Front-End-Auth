import React from 'react';
import PostCard from '../PostCard/PostCard';

const FeedsPosts = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default FeedsPosts;
