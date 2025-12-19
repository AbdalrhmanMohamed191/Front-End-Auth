// import { useRef, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { api } from "../../apis/api";
// import toast from "react-hot-toast";
// import { Loading } from "../../components/Loading/Loading";
// import { useNavigate } from "react-router-dom";
// import { errorHandler } from "../../utils/errorHandler";

// // EndPoint => accept email and password

// export const Register = () => {
//   // State
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Navigation
//   const go = useNavigate();

//   // Refs
//   const usernameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();

//   // Handlers
//   async function handleRegister(ev) {
//     ev.preventDefault();

//     setLoading(true);

//     try {
//       // Data
//       const data = {
//         username: usernameRef.current.value,
//         email: emailRef.current.value,
//         password: passwordRef.current.value,
//       };
//       // Call EndPoint
//       const response = await api.post("/api/v1/auth/register", data);
//       toast.success(response.data.message);

//       // Save Email LocalStorage
//       localStorage.setItem("email", data.email);

//       // Redirect Verify Email
//       go("/verify-otp");
//     } catch (error) {
//       // Handle Error
//       errorHandler(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleTogglePassword() {
//     setShowPassword((prev) => !prev);
//   }

//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <>
//       <h1>Register</h1>

//       <Form onSubmit={handleRegister}>
//         {/* Add Name For Profile Updates */}
//         <Form.Group className="mb-4">
//           <Form.Label htmlFor="name">Username</Form.Label>

//           <Form.Control
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Type Fullname"
//             ref={usernameRef}
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label htmlFor="email">Email</Form.Label>

//           <Form.Control
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Type Email"
//             ref={emailRef}
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label htmlFor="password">Password</Form.Label>

//           <InputGroup>
//             <Form.Control
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Type Strong Password"
//               ref={passwordRef}
//             />
//             <InputGroup.Text
//               style={{ cursor: "pointer" }}
//               onClick={handleTogglePassword}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </InputGroup.Text>
//           </InputGroup>
//         </Form.Group>

//         <Button type="submit">Register</Button>
//       </Form>
//     </>
//   );
// };



import { useRef, useState } from "react";
import {
  Button,
  Form,
  Card,
  Container,
  InputGroup,
} from "react-bootstrap";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const go = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await api.post("/api/v1/auth/register", data);
      toast.success(response.data.message);

      localStorage.setItem("email", data.email);
      go("/verify-otp");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 rounded-4"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center fw-bold mb-1">Create Account 🚀</h2>
          <p className="text-center text-muted mb-4">
            Join us and start your journey
          </p>

          <Form onSubmit={handleRegister}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                ref={usernameRef}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  ref={passwordRef}
                  required
                />
                <InputGroup.Text
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Register Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 fw-semibold rounded-3 mb-3"
            >
              Register
            </Button>

            {/* Divider */}
            <div className="text-center text-muted mb-3">
              ─── Or sign up with ───
            </div>

            {/* Social Register */}
            <div className="d-flex justify-content-center gap-3 mb-3">
              <Button
                variant="outline-primary"
                className="rounded-circle p-2"
                title="Register with Facebook"
              >
                <FaFacebookF />
              </Button>

              <Button
                variant="outline-warning"
                className="rounded-circle p-2"
                title="Register with Google"
              >
                <FaGoogle />
              </Button>

              <Button
                variant="outline-info"
                className="rounded-circle p-2"
                title="Register with Twitter"
              >
                <FaTwitter />
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none fw-semibold">
                Login
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
