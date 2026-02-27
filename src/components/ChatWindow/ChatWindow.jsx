import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Image } from "react-bootstrap";
import { api } from "../../apis/api";
import { io } from "socket.io-client";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import "./chat.css";

const socket = io("http://localhost:5000");

const ChatWindow = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const baseUrl = baseUrlHandler();

  // Socket.io
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const roomId = [currentUser._id, selectedUser._id].sort().join("_");

    socket.emit("joinRoom", {
      roomId,
      userId: currentUser._id,
    });

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/v1/messages/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleTyping = ({ userId }) => {
      if (userId === selectedUser._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
    };
  }, [selectedUser, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const roomId = [currentUser._id, selectedUser._id].sort().join("_");

    const msg = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      text,
      createdAt: new Date(),
      delivered: true,
      seen: false,
      roomId,
    };

    // emit
    socket.emit("sendMessage", msg);

    try {
      await api.post("/api/v1/messages", msg);
    } catch (err) {
      console.error(err);
    }

    setText("");
  };

  // ================= TYPING =================
  const handleTypingEmit = () => {
    const roomId = [currentUser._id, selectedUser._id].sort().join("_");
    socket.emit("typing", { roomId, userId: currentUser._id });
  };

  if (!selectedUser) {
    return <div className="text-center py-5">Select a user to chat</div>;
  }

  const profileImage = selectedUser.profileImage?.startsWith("http")
    ? selectedUser.profileImage
    : `${baseUrl}/${selectedUser.profileImage || "default-avatar.png"}`;

  return (
    <Card className="chat-window shadow-sm" style={{ height: "80vh" }}>
      {/* ===== Header ===== */}
      <Card.Header className="d-flex align-items-center gap-3 bg-white">
        <Image src={profileImage} roundedCircle width={45} height={45} />
        <div>
          <div className="fw-bold">{selectedUser.username}</div>
          <div className="chat-status-strip">
            <span className="status-dot online"></span>
            <span className="status-text">Online</span>
          </div>
        </div>
      </Card.Header>

      {/* ===== Messages ===== */}
      <Card.Body style={{ overflowY: "auto" }}>
        {messages.map((m, i) => {
          const senderId = m.sender?._id || m.sender;
          const isMe = senderId === currentUser._id;

          return (
            <div key={i} className={`message-row ${isMe ? "me" : "other"}`}>
              <div className={`message-bubble ${isMe ? "me" : "other"}`}>
                {m.text}
                <div className="message-time">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="typing-indicator">
            {selectedUser.username} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card.Body>

      {/* ===== Input ===== */}
      <Card.Footer className="bg-white">
        <Form onSubmit={handleSend} className="d-flex gap-2">
          <Form.Control
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTypingEmit();
            }}
            placeholder={`Message ${selectedUser.username}...`}
            style={{ borderRadius: "50px" }}
          />
          <Button type="submit" style={{ borderRadius: "50px" }}>
            Send
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatWindow;