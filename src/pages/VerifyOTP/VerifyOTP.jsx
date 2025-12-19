import { useRef, useState } from "react";
import {
  Button,
  Form,
  Card,
  Container,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../apis/api";
import { errorHandler } from "../../utils/errorHandler";
import { Loading } from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { ResendOTP } from "../../components/ResendOTP/ResendOTP";

export const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);

  const go = useNavigate();
  const dispatch = useDispatch();
  const otpRef = useRef();

  async function handleVerifyOTP(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const email = localStorage.getItem("email");

      if (!email) {
        toast.error("Invalid or expired code");
        go("/login");
        return;
      }

      const data = {
        otp: otpRef.current.value,
        email,
      };

      const response = await api.post(
        "/api/v1/auth/verify-otp",
        data
      );

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));

      toast.success(response.data.message);
      go("/");
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
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center fw-bold mb-1">
            Verify OTP 🔐
          </h2>
          <p className="text-center text-muted mb-4">
            Enter the 6-digit code sent to your email
          </p>

          <Form onSubmit={handleVerifyOTP}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                OTP Code
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                ref={otpRef}
                className="text-center fs-5 letter-spacing"
                required
              />
            </Form.Group>

            <div className="d-flex align-items-center justify-content-between gap-2">
              <Button
                type="submit"
                variant="primary"
                className="px-4 fw-semibold rounded-3"
              >
                Verify
              </Button>

              <ResendOTP />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
