import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { VerifyOTP } from "./pages/VerifyOTP/VerifyOTP";
import { useEffect } from "react";
import { errorHandler } from "./utils/errorHandler";
import { api } from "./apis/api";
import { setUser } from "./store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Home } from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

export default function App() {
  const { isLoggedIn } = useSelector((state) => state.user);

  // Global Dispatch
  const dispatch = useDispatch();

  // Get Token
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check User Has Token Or Not "Still Logged?"
    async function validateToken() {
      if (token) {
        try {
          const response = await api.get("/api/v1/auth/me", {
            // Hint: back -> authorization
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const user = response.data;
          // Store User Data [LocalStrage - Redux]
          dispatch(setUser(user));
        } catch (error) {
          errorHandler(error);
          // Clear Token
          localStorage.removeItem("token");
        }
      }
    }

    validateToken();
  }, [dispatch, token]);

  return (

    <div>
      {/* Global Navbar */}
      <Navbar />
      {/* Toaster */}
      <Toaster position="top-left" />

      {/* Routes */}
      <Container className="my-3 py-3">
        <Routes>

          {/* Private Routes */}
          {isLoggedIn && (
            <>
              <Route path="/profile" Component={Profile} />
            </>
          )}
          
          {/* Public Routes */}
          <Route path="/" Component={Home} />
          {!isLoggedIn && (
            <>
              {/* Auth Routes */}
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />

              {/* OTP Routes */}
              <Route path="/verify-otp" Component={VerifyOTP} />

          

              {/* Password Routes */}
              <Route path="/forgot-password" Component={ForgotPassword} />
              <Route path="/reset-password/:token" Component={ResetPassword} />
            </>
          )}
        </Routes>
      </Container>
    </div>
  );
}
