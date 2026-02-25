// import React, { useEffect, useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { api } from '../../apis/api';
// import { errorHandler } from '../../utils/errorHandler';
// import AddComment from '../AddComment/AddComment';
// import CommentItem from '../CommentItem/CommentItem';

// const CommentList = ({ post }) => {
//   const [comments, setComments] = useState([]);
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [showComments, setShowComments] = useState(true);

//   useEffect(() => {
//     async function fetchComments() {
//       try {
//         const res = await api.get(`/api/v1/posts/${post._id}/comments`);
//         setComments(res.data.comments || []);
//       } catch (error) {
//         errorHandler(error);
//       }
//     }
//     fetchComments();
//   }, [post._id]);

//   return (
//     <Card className="mt-3 p-3">
//       <AddComment
//         post={post}
//         onAddComment={(comment) => setComments(prev => [...prev, comment])}
//       />

//       {/* زرار Hide/Show all Comments يظهر مرة واحدة فقط */}
//       {comments.length > 0 && (
//         <div className="mb-3">
//           <Button
//             variant="outline-primary"
//             size="sm"
//             className="rounded-pill px-3"
//             onClick={() => setShowComments(prev => !prev)}
//           >
//             {showComments ? "Hide all comments" : `Show all comments (${comments.length})`}
//           </Button>
//         </div>
//       )}

//       {showComments &&
//         comments.map(comment => (
//           <CommentItem
//             key={comment._id}
//             comment={comment}
//             replyingTo={replyingTo}
//             onReplyClick={setReplyingTo}
//             onEdit={(updatedComment) => {
//               setComments(prev =>
//                 prev.map(c => (c._id === updatedComment._id ? updatedComment : c))
//               );
//             }}
//             onDelete={(deletedId) => {
//               setComments(prev => prev.filter(c => c._id !== deletedId));
//             }}
//           />
//         ))}
//     </Card>
//   );
// };

// export default CommentList;


import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import AddComment from '../AddComment/AddComment';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await api.get(`/api/v1/posts/${post._id}/comments`);
        setComments(res.data.comments || []);
      } catch (error) {
        errorHandler(error);
      }
    }
    fetchComments();
  }, [post._id]);

  return (
    <Card className="mt-3 p-3">
      <AddComment
        post={post}
        onAddComment={(comment) => setComments(prev => [...prev, comment])}
      />

      {comments.length > 0 && (
        <div className="mb-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="rounded-pill px-3"
            onClick={() => setShowComments(prev => !prev)}
          >
            {showComments ? "Hide all comments" : `Show all comments (${comments.length})`}
          </Button>
        </div>
      )}

      {showComments &&
        comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            replyingTo={replyingTo}
            onReplyClick={setReplyingTo}
            onEdit={(updatedComment) => {
              setComments(prev =>
                prev.map(c => (c._id === updatedComment._id ? updatedComment : c))
              );
            }}
            onDelete={(deletedId) => {
              setComments(prev => prev.filter(c => c._id !== deletedId));
            }}
          />
        ))}
    </Card>
  );
};

export default CommentList;