import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import AddComment from '../AddComment/AddComment';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';

const CommentItem = ({ comment, onDelete, onEdit, level = 0 }) => {
  const { user } = useSelector(state => state.user);
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState('');
  const isOwner = user?._id === comment.userId?._id;
  const isDisabled = newComment.trim() === "";

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/v1/comments/${comment._id}`);
      toast.success(response.data.message);
      onDelete();
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.patch(`/api/v1/comments/${comment._id}`, { text: newComment });
      toast.success(response.data.message);
      setShowEdit(false);
      onEdit(response.data.comment);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  return (
    <div className={`ms-${level * 3} mt-3` + (level > 0 ? "border-start ps-3" : "")}>
      <Card className="p-3 rounded-3 shadow-sm border-light bg-white">
        {/* HEADER: User Avatar + Username + Dates */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <UserAvatar 
            id={comment.userId?._id}
            username={comment.userId?.username || "Unknown User"}
            profileImage={comment.userId?.profileImage}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            size={40}
          />
          
        </div>

        {/* COMMENT TEXT */}
        <div className="mb-2">{comment.text}</div>

        {/* ACTION BUTTONS */}
        <div className="d-flex gap-2 mb-2">
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none"
            onClick={() => setShowReply(prev => !prev)}
          >
            {showReply ? 'Cancel' : 'Reply'}
          </Button>

          {isOwner && (
            <>
              <Button variant="link" size="sm" className="p-0 text-decoration-none" onClick={() => setShowEdit(true)}>Edit</Button>
              <Button variant="link" size="sm" className="p-0 text-decoration-none" onClick={handleDelete}>Delete</Button>
            </>
          )}
        </div>

        {/* REPLY INPUT */}
        {showReply && (
          <AddComment
            post={{ _id: comment.postId }}
            parentComment={comment._id}
            placeholder={`Reply to ${comment.userId?.username}`}
            onAddComment={(reply) => {
              onEdit(reply);
              setShowReply(false);
            }}
            onCancelReply={() => setShowReply(false)}
          />
        )}

        {/* MODAL EDIT */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              value={newComment || comment.text}
              onChange={(e) => setNewComment(e.target.value)}
              className="rounded"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>Close</Button>
            <Button variant="primary" disabled={isDisabled} className="rounded-pill" onClick={handleEdit}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default CommentItem;