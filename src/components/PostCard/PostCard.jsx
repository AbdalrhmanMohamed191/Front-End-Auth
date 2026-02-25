import React, { useState, useEffect } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import { api } from '../../apis/api';
import { baseUrlHandler } from '../../utils/baseUrlHandler';
import CommentList from '../CommentList/CommentList';
import { UserAvatar } from '../UserAvatar/UserAvatar';

const PostCard = ({ post, currentUserId }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const baseUrl = baseUrlHandler();

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(
        `/api/v1/posts/${currentPost._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // تحديث اللايك لكل مستخدم وعدد اللايكات
      setCurrentPost(prev => {
        const likedByUser = response.data.likedByUser;
        let newLikes = [...(prev.likes || [])];

        if (likedByUser) {
          // أضف المستخدم للمصفوفة إذا عمل لايك
          if (!newLikes.includes(currentUserId)) newLikes.push(currentUserId);
        } else {
          // شيل المستخدم من المصفوفة إذا عمل ديس لايك
          newLikes = newLikes.filter(id => id !== currentUserId);
        }

        return {
          ...prev,
          likes: newLikes,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentPost) return null;

  const isLiked = currentPost.likes?.includes(currentUserId);

  return (
    <Card className="mb-4 shadow-sm rounded-4" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card.Body>
        <UserAvatar
          id={currentPost.userId?._id}
          username={currentPost.userId?.username}
          profileImage={currentPost.userId?.profileImage}
          createdAt={currentPost.createdAt}
        />

        <Carousel className="mb-3 rounded-3 overflow-hidden">
          {currentPost.images.map((image, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                // src={`${baseUrl}/${image}`}
                // src={image.startsWith("http") ? image : baseUrlHandler(image)}
                 src={image.startsWith("http") ? image : `${baseUrl}/${image}`}

                alt={`Slide ${idx + 1}`}
                style={{ maxHeight: 700, objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Card.Text>{currentPost.caption}</Card.Text>
          <div 
            className="d-flex align-items-center gap-3 mb-2"
          >
        <Button 
          variant={isLiked ? "danger" : "outline-danger"}
          onClick={handleLike}
        >
          ❤️ {isLiked ? "Unlike" : "Like"}
        </Button>
        <p>{currentPost.likes?.length || 0} Likes</p>
          </div>
        
        <CommentList post={currentPost} />
      </Card.Body>
    </Card>
  );
};

export default PostCard;