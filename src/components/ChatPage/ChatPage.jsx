// import React, { useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import ChatList from "../Chat list/Chatlist";
// import ChatWindow from "../ChatWindow/ChatWindow";

// const ChatPage = () => {
//   const { user: currentUser } = useSelector((state) => state.user);
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <Row className="p-3" style={{ height: "90vh" }}>
//       <Col md={4} className="border-end" style={{ overflowY: "auto" }}>
//         <ChatList selectedUser={selectedUser} onSelectUser={setSelectedUser} />
//       </Col>
//       <Col md={8}>
//         <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
//       </Col>
//     </Row>
//   );
// };

// export default ChatPage;


import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChatList from "../Chat list/Chatlist";
import ChatWindow from "../ChatWindow/ChatWindow";
import "./chatPage.css";

const ChatPage = () => {
  const { user: currentUser } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-page-wrapper">
      <Row className="chat-page-row">
        {/* Chat List */}
        <Col
          md={4}
          className="chat-list-col border-end"
        >
          <ChatList
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </Col>

        {/* Chat Window */}
        <Col md={8} className="chat-window-col">
          <ChatWindow
            selectedUser={selectedUser}
            currentUser={currentUser}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChatPage;