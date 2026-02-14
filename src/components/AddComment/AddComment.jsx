// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { errorHandler } from '../../utils/errorHandler';
// import { api } from '../../apis/api';
// import toast from 'react-hot-toast';

// const AddComment = ({post , onAddComment}) => {
//     const [text , setText] = useState("");

//     const isDisabled = text.trim() === "";

//     async function handleAddComment(ev) {
//         ev.preventDefault();
//         try {

//             // Hit endpoint to add comment
//             const token = localStorage.getItem('token');
//             const data = {
//                 text,
//                 postId : post._id
//             }
//             const response = await api.post("/api/v1/comments", data , {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             // console.log(response);
//             const { comment , message } = response.data; 
//             // Add the new comment to the comment list
//             onAddComment(comment);

//             setText("");
//             toast.success(message);

//         } catch (error) {
//             console.log(error);
//             errorHandler(error);
//         }
//     }





//   return (
//     <Form onSubmit={handleAddComment} className='w-100 mt-3 d-flex flex-column align-items-center justify-content-center text-center'>
//         <Form.Control type="text" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)} />
//         <Button disabled={ isDisabled } variant={isDisabled ? "secondary" : "primary"} type="submit" className='mt-2'>
//         Comment
//         </Button>
//     </Form>
//   )
// }

// export default AddComment




import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import toast from 'react-hot-toast';

const AddComment = ({ post, onAddComment }) => {
  const [text, setText] = useState("");
  const isDisabled = text.trim() === "";

  async function handleAddComment(ev) {
    ev.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { text, postId: post._id };
      const response = await api.post("/api/v1/comments", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAddComment(response.data.comment);
      setText("");
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  return (
    <Form onSubmit={handleAddComment} className="d-flex gap-2 mb-2">
      <Form.Control
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button disabled={isDisabled} variant={isDisabled ? "secondary" : "primary"} type="submit">
        Comment
      </Button>
    </Form>
  );
};

export default AddComment;
