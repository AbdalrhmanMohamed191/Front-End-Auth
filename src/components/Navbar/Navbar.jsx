import { Navbar as BNavbar, Button, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/slices/userSlice";
import { SlSocialTwitter } from "react-icons/sl";


export const Navbar = () => {
  // Get User Logged Or Not
  const { isLoggedIn } = useSelector((state) => state.user);

  // Global Hooks
  const dispatch = useDispatch();
  const go = useNavigate();

  // Handlers
  function handleLogout() {
    // Reset User Data
    dispatch(clearUser());
    // Clear Session
    localStorage.removeItem("token");
    // Redirect Login
    go("/login");
  }

  return (
    <BNavbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          <SlSocialTwitter size={28}  className="mb-1 me-2 text-danger" />
          <span className="ms-2">TwitClone</span>

        </BNavbar.Brand>

        <BNavbar.Toggle />

        <BNavbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {/* Hide Auth */}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}

            {/* Profile */}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}

            {/* Show Logout */}
            {isLoggedIn && (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};


// import { Navbar as BNavbar, Button, Container, Nav } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { clearUser } from "../../store/slices/userSlice";
// import { SlSocialTwitter } from "react-icons/sl";

// export const Navbar = () => {
//   const { isLoggedIn } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(clearUser());
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <BNavbar expand="md" bg="dark" variant="dark" className="shadow-sm">
//       <Container>
//         {/* Logo */}
//         <BNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
//           <SlSocialTwitter size={28} className="me-2 text-danger" />
//           <span className="fw-bold fs-5">TwitClone</span>
//         </BNavbar.Brand>

//         <BNavbar.Toggle aria-controls="navbar-nav" />

//         <BNavbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             <Nav.Link as={Link} to="/" className="mx-1">
//               Home
//             </Nav.Link>

//             {!isLoggedIn && (
//               <>
//                 <Nav.Link as={Link} to="/login" className="mx-1">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/register" className="mx-1">
//                   Register
//                 </Nav.Link>
//               </>
//             )}

//             {isLoggedIn && (
//               <>
//                 <Nav.Link as={Link} to="/profile" className="mx-1">
//                   Profile
//                 </Nav.Link>
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   className="ms-2"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </>
//             )}
//           </Nav>
//         </BNavbar.Collapse>
//       </Container>
//     </BNavbar>
//   );
// };

