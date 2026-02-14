// import React, { useState } from 'react'
// import { UserAvatar } from '../UserAvatar/UserAvatar';
// import { useSelector } from 'react-redux';
// import { errorHandler } from '../../utils/errorHandler';
// import { api } from '../../apis/api';
// import toast from 'react-hot-toast';
// import { Form, Modal } from 'react-bootstrap';

// const CommentItem = ({comment, onDelete, onEdit}) => {
//     const {user} = useSelector(state => state.user);
//     const [show , setShow] = useState(false);
//     const [newComment , setNewComment] = useState('');
//     const isDisabled = newComment.trim() === "";
//     function handleClose() {
//         setShow(false);
//     }
//     function handleShow() {
//         setShow(true);
//     }
//     const isOwner = user._id === comment.userId._id;
   
//     // handle Delete
//     async function handleDelete() {
//         try {
//             // Call the API to delete the comment
//             const id = comment._id;
//             const response = await api.delete(`/api/v1/comments/${id}`);
//             const {message} = response.data;
//             onDelete();
//             toast.success(message);
//         } catch (error) {
//             console.log(error);
//             errorHandler(error);
//         }
//     }
//     // handle Edit
//     function editHandler() {
//         try {
//         // show modal 
//         handleShow();
//     } catch (error) {
//             console.log(error);
//             errorHandler(error);
//         }
//     }

//     async function updateHandler() {
//         try {
//             // Call the API to update the comment
//             const id = comment._id;
//             const data = {
//                 text : newComment
//             }
//             const response = await api.patch(`/api/v1/comments/${id}`, data);
//             console.log(response)
//             const {comment : updatedComment , message} = response.data;
//             toast.success(message);
//             // close the modal
//             handleClose();
//             setNewComment("");
//             // update the comment text in the UI
//             onEdit(updatedComment);
//         } catch (error) {
//             console.log(error);
//             errorHandler(error);
//         }
//     }

//   return (
//     <div className='comment-item border rounded p-2 m-2 rounded' >
//         <UserAvatar createdAt={comment.createdAt} updatedAt={comment.updatedAt} username={comment.userId.username} profileImage={comment.userId.profileImage} />
//         <strong>{comment.userId?.username}</strong>
//         <p>{comment.text}</p>

//              <Modal show={show} onHide={handleClose}>
//                  <Modal.Header closeButton>
//                         <Modal.Title>Edit Comment</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                         <Form.Control type='text' id='comment' placeholder='Edit Comment' onChange={(e) => setNewComment(e.target.value)} defaultValue={comment.text} />
//                 </Modal.Body>
//                 <Modal.Footer>
//                         <button className='btn btn-secondary' onClick={handleClose}>Close</button>
//                         <button className='btn btn-primary' disabled={isDisabled} onClick={updateHandler}>Update</button>
//                  </Modal.Footer>
//             </Modal>
//         {/* 2 buttons for update and delete */}
//         {isOwner && <div className='d-flex gap-2 align-items-center' >
//             <button onClick={editHandler} className='btn btn-sm btn-primary' >Edit</button>
//             <button onClick={handleDelete} className='btn btn-sm btn-danger' >Delete</button>
//         </div>}
//     </div>
//   )
// }

// export default CommentItem




import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import toast from 'react-hot-toast';
import { Form, Modal, Button, Card } from 'react-bootstrap';
import { UserAvatar } from '../UserAvatar/UserAvatar';

const CommentItem = ({ comment, onDelete, onEdit }) => {
  const { user } = useSelector(state => state.user);
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState('');
  const isDisabled = newComment.trim() === "";
  const isOwner = user._id === comment.userId._id;

  async function handleDelete() {
    try {
      const response = await api.delete(`/api/v1/comments/${comment._id}`);
      toast.success(response.data.message);
      onDelete();
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  async function updateHandler() {
    try {
      const response = await api.patch(`/api/v1/comments/${comment._id}`, { text: newComment });
      toast.success(response.data.message);
      setNewComment("");
      setShow(false);
      onEdit(response.data.comment);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  return (
    <Card className="mb-2 p-2 rounded-3">
      <UserAvatar
        username={comment.userId.username}
        profileImage={comment.userId.profileImage}
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
      />
      <p>{comment.text}</p>

      {isOwner && (
        <div className="d-flex gap-2 mb-2">
          <Button size="sm" variant="outline-primary" onClick={() => setShow(true)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={handleDelete}>Delete</Button>
        </div>
      )}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Edit Comment"
            value={newComment || comment.text}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" disabled={isDisabled} onClick={updateHandler}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default CommentItem;
