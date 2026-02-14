// import React, { useState } from 'react';
// import { Button, Carousel } from 'react-bootstrap';
// import { baseUrlHandler } from '../../utils/baseUrlHandler';
// import { errorHandler } from '../../utils/errorHandler';
// import { api } from '../../apis/api';
// import AddComment from '../AddComment/AddComment';
// import CommentList from '../CommentList/CommentList';
// import { UserAvatar } from '../UserAvatar/UserAvatar';

// const PostCard = ({ post }) => {

//   const [currentPost, setCurrentPost] = useState(post);

//   const baseUrl = baseUrlHandler();
//   async function handleLike(ev) {
// ev.preventDefault();
// try {
//   // prepare data
// const postId = post._id;

// // Get the token from localStorage
// const token = localStorage.getItem('token');

// // Call the API
// const response = await api.put(`/api/v1/posts/${postId}/like`, {} , {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Update the post state with the new likes
// // console.log(response.data.likesCount);
//   setCurrentPost(prev => ({
//       ...prev,
//       likes: response.data.likesCount,
//     }));
// // setCurrentPost(response.data.likesCount);
// } catch (error) {
//   console.log(error)
//   errorHandler(error);
// }

//   }

//           // console.log(currentPost.userId);

  
//   return (



//     <div className='post-card mb-4 p-3 border rounded shadow bg-white d-flex flex-column align-items-center justify-content-center text-center'
//     style={{width :  "500px", margin: "0 auto"}}  
//     >

//       {/* owner details */}
//       <UserAvatar createdAt={currentPost.createdAt} updatedAt={currentPost.updatedAt} username={currentPost.userId.username} profileImage={currentPost.userId.profileImage} />


//         <Carousel>
//           {currentPost.images.map((image, index) => (
//             <Carousel.Item key={index}>
//               <img
//                 className="d-block w-100"
//                 src={`${baseUrl}/${image}`}
//                 alt={`Slide ${index + 1}`}
//               />
//             </Carousel.Item>
//           ))}
//         </Carousel>

//         {/* caption */}
//         <h5 className="mt-3">{currentPost.caption}</h5>

//         <Button variant="primary" className='mt-3' onClick={handleLike}>Like</Button>
//         <p className='mt-2'>{currentPost.likes} Likes</p>

//         <CommentList post={currentPost}  />
      
//     </div>

    
//   );

// };

// export default PostCard;





import React, { useState } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import { baseUrlHandler } from '../../utils/baseUrlHandler';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import CommentList from '../CommentList/CommentList';
import { UserAvatar } from '../UserAvatar/UserAvatar';

const PostCard = ({ post }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const baseUrl = baseUrlHandler();

  async function handleLike(ev) {
    ev.preventDefault();
    try {
      const postId = post._id;
      const token = localStorage.getItem('token');
      const response = await api.put(`/api/v1/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentPost(prev => ({ ...prev, likes: response.data.likesCount }));
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  return (
    <Card className="mb-4 shadow-sm rounded-4" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card.Body>
        <UserAvatar
          username={currentPost.userId.username}
          profileImage={currentPost.userId.profileImage}
          createdAt={currentPost.createdAt}
          updatedAt={currentPost.updatedAt}
        />

        <Carousel className="mb-3 rounded-3 overflow-hidden">
          {currentPost.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`${baseUrl}/${image}`}
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: 400, objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Card.Text className="mb-3">{currentPost.caption}</Card.Text>

        <Button variant="outline-danger" className="mb-2" onClick={handleLike}>
          ❤️ Love
        </Button>
        <p>{currentPost.likes} Loves</p>

        <CommentList post={currentPost} />
      </Card.Body>
    </Card>
  );
};

export default PostCard;



