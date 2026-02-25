


import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';

const AddComment = ({ post, onAddComment, parentComment = null, replyToUser = null, onCancelReply, placeholder }) => {
  const [text, setText] = useState("");

  // reply mention تلقائي
  useEffect(() => {
    if (replyToUser) {
      setText(`@${replyToUser.username} `);
    }
  }, [replyToUser]);

  const isDisabled = text.trim() === "";

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = {
        text,
        postId: post._id,
        parentComment: parentComment || null
      };
      const res = await api.post("/api/v1/comments", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAddComment(res.data.comment);
      setText("");
      toast.success(res.data.message);
      if (onCancelReply) onCancelReply();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Form onSubmit={handleAddComment} className="mb-3">
      <div className="d-flex gap-2 align-items-center">
        <Form.Control
          type="text"
          placeholder={placeholder || (parentComment ? "Reply..." : "Add a comment...")}
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