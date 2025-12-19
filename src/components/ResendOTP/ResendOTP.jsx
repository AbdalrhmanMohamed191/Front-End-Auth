import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";

// EndPoint => accept email

export const ResendOTP = () => {
  // States
  const [loading, setLoading] = useState(false);

  // Handlers
  async function handleResend() {
    setLoading(true);
    try {
      // Prepare Data
      const email = localStorage.getItem("email");

      // Call EndPoint
      const response = await api.post("/api/v1/auth/resend-otp", { email });
      console.log(response);
    } catch (error) {
      // Handle Error
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        type="button"
        variant="outline-success"
        onClick={handleResend}
        disabled={loading}
      >
        {loading ? "Resending..." : "Resend OTP"}
      </Button>
    </>
  );
};
