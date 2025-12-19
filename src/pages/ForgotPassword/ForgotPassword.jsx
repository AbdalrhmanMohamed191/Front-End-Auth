// import React, { useRef, useState } from "react";
// import { errorHandler } from "../../utils/errorHandler";
// import { Button, Form } from "react-bootstrap";
// import { api } from "../../apis/api";
// import toast from "react-hot-toast";

// export const ForgotPassword = () => {
//   // States
//   const [loading, setLoading] = useState(false);
//   // Ref
//   const emailRef = useRef();

//   // Handlers
//   async function handleForgotPassword(ev) {
//     ev.preventDefault();

//     setLoading(true);

//     try {
//       // Prepare Data
//       const data = {
//         email: emailRef.current.value,
//       };

//       // Call EndPoint
//       const response = await api.post("/api/v1/auth/forgot-password", data);
//       toast.success(response.data.message);

//       // Reset Email
//       emailRef.current.value = "";
//     } catch (error) {
//       console.log(error);
//       errorHandler(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <h1>ForgotPassword</h1>
//       <Form onClick={handleForgotPassword}>
//         <Form.Group className="mb-4">
//           <Form.Label htmlFor="email">Email</Form.Label>
//           <Form.Control
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter Your Email"
//             ref={emailRef}
//           />
//         </Form.Group>

//         <Button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Reset Password"}
//         </Button>
//       </Form>
//     </div>
//   );
// };



import { useRef, useState } from "react";
import {
  Button,
  Form,
  Card,
  Container,
} from "react-bootstrap";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { errorHandler } from "../../utils/errorHandler";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  async function handleForgotPassword(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: emailRef.current.value,
      };

      const response = await api.post(
        "/api/v1/auth/forgot-password",
        data
      );

      toast.success(response.data.message);
      emailRef.current.value = "";
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 rounded-4"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center fw-bold mb-1">
            Forgot Password 🔒
          </h2>
          <p className="text-center text-muted mb-4">
            Enter your email to reset your password
          </p>

          <Form onSubmit={handleForgotPassword}>
            <Form.Group className="mb-4">
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

            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 fw-semibold rounded-3 mb-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </Button>

            <p className="text-center mb-0">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-decoration-none fw-semibold"
              >
                Login
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
