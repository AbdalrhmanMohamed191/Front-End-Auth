




import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import AddComment from '../AddComment/AddComment';
import { api } from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';

const CommentItem = ({ comment, level = 0, replyingTo, onReplyClick, onEdit, onDelete }) => {
  const { user } = useSelector(state => state.user);
  const [showEdit, setShowEdit] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [repliesVisible, setRepliesVisible] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);

  const isOwner = user?._id === comment.userId?._id;

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/v1/comments/${comment._id}`);
      toast.success(res.data.message);
      onDelete(comment._id);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await api.patch(`/api/v1/comments/${comment._id}`, { text: newText });
      toast.success(res.data.message);
      setShowEdit(false);
      onEdit(res.data.comment);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div
      style={{
        borderLeft: level > 0 ? "3px solid #eee" : "none",
        paddingLeft: level > 0 ? "12px" : "0",
        marginTop: "10px"
      }}
    >
      <Card className="p-3 rounded-4 shadow-sm">
        <UserAvatar
          id={comment.userId?._id}
          username={comment.userId?.username}
          profileImage={comment.userId?.profileImage}
          createdAt={comment.createdAt}
        />

        {/* عرض النص مع clickable mentions */}
        <div className="mb-2" style={{ whiteSpace: "pre-wrap", fontSize: '0.95rem' }}>
          {comment.text.split(/(@\w+)/g).map((part, i) => {
            if (part.startsWith('@')) {
              const username = part.slice(1);
              return (
                <a
                  key={i}
                  href={`/profile/${username}`}
                  className="text-primary text-decoration-none"
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </div>

        {/* Reply / Edit / Delete */}
        <div className="d-flex gap-2 mb-2 flex-wrap">
          <Button
            variant="outline-primary"
            size="sm"
            className="rounded-pill px-3 py-1"
            onClick={() => onReplyClick(comment._id)}
          >
            {replyingTo === comment._id ? "Cancel" : "Reply"}
          </Button>

          {isOwner && (
            <>
              <Button
                variant="outline-warning"
                size="sm"
                className="rounded-pill px-3 py-1"
                onClick={() => setShowEdit(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="rounded-pill px-3 py-1"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </div>

        {/* Reply Input مع Mention تلقائي
        {replyingTo === comment._id && (
          <div className="mt-2 mb-2" style={{ marginLeft: '10px' }}>
            <AddComment
              post={{ _id: comment.postId }}
              parentComment={comment._id}
              replyToUser={comment.userId?.username}
              placeholder={`Reply to ${comment.userId?.username}`}
              onAddComment={(reply) => {
                comment.replies = comment.replies || [];
                comment.replies.push(reply);
                setForceUpdate(prev => !prev);
                onReplyClick(null);
              }}
              onCancelReply={() => onReplyClick(null)}
            />
          </div>
        )} */}


        {/* Reply Input مع Mention تلقائي */}
{replyingTo === comment._id && (
  <div className="mt-2 mb-2" style={{ marginLeft: '10px' }}>
    <AddComment
      post={{ _id: comment.postId }}
      parentComment={comment._id}
      replyToUser={{
        _id: comment.userId?._id,
        username: comment.userId?.username
      }}
      placeholder={`Reply to ${comment.userId?.username}`}
      onAddComment={(reply) => {
        // ضيف الردود للـ comment الحالي
        comment.replies = comment.replies || [];
        comment.replies.push(reply);

        // force re-render
        setForceUpdate(prev => !prev);

        // اخفاء حقل الرد
        onReplyClick(null);
      }}
      onCancelReply={() => onReplyClick(null)}
    />
  </div>
)}

        {/* زر Hide/Show Replies لكل كومنت */}
        {comment.replies?.length > 0 && (
          <Button
            variant="outline-secondary"
            size="sm"
            className="rounded-pill px-3 mb-2"
            onClick={() => setRepliesVisible(prev => !prev)}
          >
            {repliesVisible ? "Hide replies" : `Show replies (${comment.replies.length})`}
          </Button>
        )}

        {/* Replies */}
        {repliesVisible && comment.replies?.length > 0 && (
          <div className="mt-2">
            {comment.replies.map(reply => (
              <CommentItem
                key={reply._id}
                comment={reply}
                level={level + 1}
                replyingTo={replyingTo}
                onReplyClick={onReplyClick}
                onEdit={(updatedReply) => {
                  comment.replies = comment.replies.map(r =>
                    r._id === updatedReply._id ? updatedReply : r
                  );
                  setForceUpdate(prev => !prev);
                }}
                onDelete={(deletedId) => {
                  comment.replies = comment.replies.filter(r => r._id !== deletedId);
                  setForceUpdate(prev => !prev);
                }}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control value={newText} onChange={(e) => setNewText(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEdit(false)}>Close</Button>
          <Button onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentItem;