import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';

const AddComment = ({ post, onAddComment, parentComment = null, onCancelReply, placeholder }) => {
  const [text, setText] = useState("");
  const isDisabled = text.trim() === "";

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = {
        text,
        postId: post._id,
        parentComment
      };
      const response = await api.post("/api/v1/comments", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAddComment(response.data.comment);
      setText("");
      toast.success(response.data.message);
      if (onCancelReply) onCancelReply();
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  return (
   <Form onSubmit={handleAddComment} className="mb-3">
  <div className="d-flex flex-wrap align-items-center gap-2">
    <Form.Control
      type="text"
      placeholder={placeholder || (parentComment ? "Reply to comment..." : "Add a comment...")}
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="flex-grow-1 rounded-pill border-1 border-secondary shadow-sm px-3 py-2 bg-white"
    />
    
    <Button
      disabled={isDisabled}
      variant={isDisabled ? "secondary" : "primary"}
      type="submit"
      className="rounded-pill px-3 py-2"
    >
      {parentComment ? "Reply" : "Comment"}
    </Button>

    {parentComment && onCancelReply && (
      <Button
        type="button"
        variant="outline-secondary"
        onClick={onCancelReply}
        className="rounded-pill px-3 py-2"
      >
        Cancel
      </Button>
    )}
  </div>
</Form>
  );
};

export default AddComment;