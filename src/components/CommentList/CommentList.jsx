// import React, { useEffect, useState } from 'react'
// import { errorHandler } from '../../utils/errorHandler';
// import { api } from '../../apis/api';
// import CommentItem from '../CommentItem/CommentItem';
// import AddComment from '../AddComment/AddComment';

// const CommentList = ({ post }) => {

//     const [comments, setComments] = useState([]);
//     const postId = post._id;

//     // comment list api call

//     useEffect(() => {
//         async function fetchComments() {
//             try {
//                 const response = await api.get(`/api/v1/posts/${postId}/comments`);
//                 // console.log(response.data.comments);
//                 setComments(response.data.comments);

//             } catch (error) {
//                 console.log(error);
//                 errorHandler(error);
//             }
//         }
//         fetchComments();
//     }, [postId]);



//   return (
//     <div>

//         <AddComment post={post} onAddComment={(comment) => setComments(prev => [...prev, comment])} />


//       {comments.map(comment => <CommentItem key={comment._id} comment={comment}
//         onEdit ={(comment)=> {
//             // update the comment in the list
//             setComments(prev => prev.map(c => c._id === comment._id ? comment : c));
//         }}
//       onDelete={()=> {
//         // remove the deleted comment from the list
//         setComments(prev => prev.filter(c => c._id !== comment._id));
//       } } />)}
//     </div>
//   )
// }

// export default CommentList




import React, { useEffect, useState } from 'react';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import CommentItem from '../CommentItem/CommentItem';
import AddComment from '../AddComment/AddComment';
import { Card } from 'react-bootstrap';

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);
  const postId = post._id;

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(`/api/v1/posts/${postId}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    }
    fetchComments();
  }, [postId]);

  return (
    <Card className="mt-3 rounded-3 bg-light p-2">
      <AddComment post={post} onAddComment={(comment) => setComments(prev => [...prev, comment])} />
      {comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onEdit={(updated) => setComments(prev => prev.map(c => c._id === updated._id ? updated : c))}
          onDelete={() => setComments(prev => prev.filter(c => c._id !== comment._id))}
        />
      ))}
    </Card>
  );
};

export default CommentList;
