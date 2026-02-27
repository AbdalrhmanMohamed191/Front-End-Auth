import { Navbar as BNavbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/slices/userSlice";
import { SlSocialTwitter } from "react-icons/sl";

export const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Nav Links
  const guestLinks = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  const authLinks = [
    { path: "/", label: "Home" },
    { path: "/chat", label: "Chat" },
  ];

  return (
    <BNavbar expand="md" bg="dark" variant="dark">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          <SlSocialTwitter size={28} className="mb-1 me-2 text-danger" />
          <span className="ms-2">TwitClone</span>
        </BNavbar.Brand>

        <BNavbar.Toggle />
        <BNavbar.Collapse>
          <Nav className="ms-auto align-items-center">
            {/* Common Links */}
            {authLinks.map((link) => (
              <Nav.Link key={link.path} as={Link} to={link.path}>
                {link.label}
              </Nav.Link>
            ))}

            {/* Guest Links */}
            {!isLoggedIn &&
              guestLinks.map((link) => (
                <Nav.Link key={link.path} as={Link} to={link.path}>
                  {link.label}
                </Nav.Link>
              ))} 

            {/* Auth Dropdown */}
            {isLoggedIn && (
              <NavDropdown title={user?.username || "Profile"} align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

