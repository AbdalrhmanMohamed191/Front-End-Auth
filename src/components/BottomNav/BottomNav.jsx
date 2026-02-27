import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineMessage } from "react-icons/ai";
import "./bottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <AiFillHome size={24} />, label: "Home" },
    { path: "/chat", icon: <AiOutlineMessage size={24} />, label: "Chat" },
    { path: "/profile", icon: <AiOutlineUser size={24} />, label: "Profile" },
  ];

  return (
    <Nav className="bottom-nav d-md-none justify-content-around">
      {navItems.map((item) => (
        <Nav.Item key={item.path}>
          <Nav.Link
            as={Link}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.icon}
            <div className="nav-label">{item.label}</div>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default BottomNav;