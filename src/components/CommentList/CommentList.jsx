import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import AddComment from '../AddComment/AddComment';
import CommentItem from '../CommentItem/CommentItem';


const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);
  const postId = post._id;

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(`/api/v1/posts/${postId}/comments`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    }
    fetchComments();
  }, [postId]);

  const renderComments = (parentId = null, level = 0) =>
    comments
      .filter(c => (c.parentComment ? c.parentComment === parentId : parentId === null))
      .map(c => (
        <CommentItem
          key={c._id}
          comment={c}
          level={level}
          onEdit={(updatedComment) => {
            const exists = comments.find(x => x._id === updatedComment._id);
            setComments(prev =>
              exists
                ? prev.map(x => x._id === updatedComment._id ? updatedComment : x)
                : [...prev, updatedComment]
            );
          }}
          onDelete={() => setComments(prev => prev.filter(x => x._id !== c._id))}
        >
          {renderComments(c._id, level + 1)}
        </CommentItem>
      ));

  return (
    <Card className="mt-3 rounded-3 bg-light p-2">
      <AddComment
        post={post}
        onAddComment={(c) => setComments(prev => [...prev, c])}
      />
      {renderComments()}
    </Card>
  );
};

export default CommentList;




// import React, { useEffect, useState } from 'react';
// import { Card, Button, ListGroup } from 'react-bootstrap';
// import { api } from '../../apis/api';
// import { errorHandler } from '../../utils/errorHandler';
// import AddComment from '../AddComment/AddComment';
// import CommentItem from '../CommentItem/CommentItem';

// const CommentList = ({ post }) => {
//   const [comments, setComments] = useState([]);
//   const postId = post._id;

//   useEffect(() => {
//     async function fetchComments() {
//       try {
//         const response = await api.get(`/api/v1/posts/${postId}/comments`);
//         setComments(response.data.comments || []);
//       } catch (error) {
//         console.log(error);
//         errorHandler(error);
//       }
//     }
//     fetchComments();
//   }, [postId]);

//   const renderComments = (parentId = null, level = 0) =>
//     comments
//       .filter(c => (c.parentComment ? c.parentComment === parentId : parentId === null))
//       .map(c => (
//         <CommentItem
//           key={c._id}
//           comment={c}
//           level={level}
//           onEdit={(updatedComment) => {
//             const exists = comments.find(x => x._id === updatedComment._id);
//             setComments(prev =>
//               exists
//                 ? prev.map(x => x._id === updatedComment._id ? updatedComment : x)
//                 : [...prev, updatedComment]
//             );
//           }}
//           onDelete={() => setComments(prev => prev.filter(x => x._id !== c._id))}
//         >
//           {renderComments(c._id, level + 1)}
//         </CommentItem>
//       ));

//   return (
//     <Card className="mt-3 shadow-sm rounded-3">
//       <Card.Body>
//         <Card.Title className="mb-3 text-primary">Comments</Card.Title>

//         <AddComment
//           post={post}
//           onAddComment={(c) => setComments(prev => [...prev, c])}
//         />

//         <ListGroup variant="flush" className="mt-3">
//           {renderComments()}
//         </ListGroup>
//       </Card.Body>
//     </Card>
//   );
// };

// export default CommentList;