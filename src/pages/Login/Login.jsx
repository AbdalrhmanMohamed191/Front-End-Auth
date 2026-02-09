
import { useRef, useState } from "react";
import {
  Button,
  Form,
  Card,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Loading } from "../../components/Loading/Loading";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const go = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await api.post("/api/v1/auth/login", data);
      const { token, message, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(setUser(user));

      toast.success(message);
      go("/");
    } catch (error) {
      if (error.response?.data?.isVerified === false) {
        localStorage.setItem("email", error.response.data.email);
        go("/verify-otp");
      }
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
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center fw-bold mb-1">Welcome Back  </h2>
          <p className="text-center text-muted mb-4">
            Login to continue 
          </p>

          <Form onSubmit={handleLogin}>
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
                  placeholder="Enter your password"
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

            {/* Links */}
            <div className="d-flex justify-content-between mb-4">
              <Link to="/register" className="text-decoration-none">
                Create account
              </Link>
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 fw-semibold rounded-3 mb-3"
            >
              Login
            </Button>

            {/* Divider */}
            <div className="text-center text-muted mb-3">
              ─── Or login with ───
            </div>

            {/* Social Login */}
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-primary"
                className="rounded-circle p-2"
                title="Login with Facebook"
              >
                <FaFacebookF />
              </Button>

              <Button
                variant="outline-danger"
                className="rounded-circle p-2"
                title="Login with Google"
              >
                <FaGoogle />
              </Button>

              <Button
                variant="outline-info"
                className="rounded-circle p-2"
                title="Login with Twitter"
              >
                <FaTwitter />
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
