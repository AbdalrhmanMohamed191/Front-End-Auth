import React, { useEffect, useState } from "react";
import { ListGroup, Spinner, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { api } from "../../apis/api";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import "../ChatWindow/chat.css";

const ChatList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);
  const baseUrl = baseUrlHandler();

  useEffect(() => {
    if (!user?._id) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/v1/user/${user._id}/connections`);
        setUsers(res.data.following || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  return (
    <ListGroup className="border-0 chat-list">
      {users.length === 0 && (
        <div className="text-center text-muted mt-4">No users</div>
      )}

      {users.map((u) => {
        const avatar = u.profileImage?.startsWith("http")
          ? u.profileImage
          : `${baseUrl}/${u.profileImage || "default-avatar.png"}`;

        return (
          <ListGroup.Item
            key={u._id}
            action
            active={selectedUser?._id === u._id}
            onClick={() => onSelectUser(u)}
            className="d-flex align-items-center gap-3 py-2"
            style={{ borderRadius: "10px", cursor: "pointer" }}
          >
            <Image
              src={avatar}
              roundedCircle
              width={45}
              height={45}
              style={{ objectFit: "cover" }}
            />

            <div className="d-flex flex-column">
              <div className="fw-bold">{u.username}</div>

              <div className="chat-status-strip">
                <span className="status-dot online"></span>
                <span className="status-text">Online</span>
              </div>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ChatList;