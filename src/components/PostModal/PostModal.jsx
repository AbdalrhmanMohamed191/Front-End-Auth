// import React, { useEffect, useState } from "react";
// import { Modal, Carousel, Button, Card, Form } from "react-bootstrap";
// import { baseUrlHandler } from "../../utils/baseUrlHandler";
// import { api } from "../../apis/api";
// import { errorHandler } from "../../utils/errorHandler";
// import CommentList from "../CommentList/CommentList";

// const PostModal = ({ show, handleClose, post }) => {
//   const [currentPost, setCurrentPost] = useState(post);
//   const baseUrl = baseUrlHandler();

//   useEffect(() => {
//     setCurrentPost(post);
//   }, [post]);

//   async function handleLike() {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await api.put(
//         `/api/v1/posts/${post._id}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentPost((prev) => ({ ...prev, likes: response.data.likesCount }));
//     } catch (error) {
//       errorHandler(error);
//     }
//   }

//   if (!currentPost) return null;

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Post</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Carousel className="mb-3">
//           {currentPost.images.map((img, idx) => (
//             <Carousel.Item key={idx}>
//               <img
//                 src={`${baseUrl}/${img}`}
//                 alt={`Slide ${idx + 1}`}
//                 className="d-block w-100"
//                 style={{ maxHeight: "500px", objectFit: "cover" }}
//               />
//             </Carousel.Item>
//           ))}
//         </Carousel>

//         <div className="d-flex align-items-center gap-2 mb-2">
//           <Button variant="outline-danger" onClick={handleLike}>
//             ❤️ Like
//           </Button>
//           <span>{currentPost.likes} Likes</span>
//         </div>

//         <p>{currentPost.caption}</p>

//         <CommentList post={currentPost} />
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default PostModal;




import React, { useEffect, useState } from "react";
import { Modal, Carousel, Button } from "react-bootstrap";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { api } from "../../apis/api";
import { errorHandler } from "../../utils/errorHandler";
import CommentList from "../CommentList/CommentList";

const PostModal = ({ show, handleClose, post }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const baseUrl = baseUrlHandler();

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  async function handleLike() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/api/v1/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // تحديث binary like (0 أو 1)
      setCurrentPost(prev => ({
        ...prev,
        likes: response.data.likesCount
      }));
    } catch (error) {
      errorHandler(error);
    }
  }

  if (!currentPost) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel className="mb-3">
          {currentPost.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={`${baseUrl}/${img}`}
                alt={`Slide ${idx + 1}`}
                className="d-block w-100"
                style={{ maxHeight: "700px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="d-flex align-items-center gap-2 mb-2">
          <Button variant="outline-danger" onClick={handleLike}>
            ❤️ {currentPost.likes === 1 ? "Unlike" : "Like"}
          </Button>
          <span>{currentPost.likes} Likes</span>
        </div>

        <p>{currentPost.caption}</p>

        <CommentList post={currentPost} />
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
