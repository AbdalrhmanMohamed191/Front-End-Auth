import { useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Container,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const newPasswordRef = useRef();
  const go = useNavigate();
  const { token } = useParams();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        token,
        newPassword: newPasswordRef.current.value,
      };

      const response = await api.post(
        "/api/v1/auth/reset-password",
        data
      );

      toast.success(response.data.message);
      go("/login");
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
            Reset Password 🔑
          </h2>
          <p className="text-center text-muted mb-4">
            Create a new secure password
          </p>

          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                New Password
              </Form.Label>

              <InputGroup>
                <Form.Control
                  ref={newPasswordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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

            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 fw-semibold rounded-3 mb-3"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <p className="text-center mb-0">
              Back to{" "}
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
