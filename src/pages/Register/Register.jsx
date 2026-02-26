// import { useRef, useState } from "react";
// import { Button, Form, Card, Container, InputGroup } from "react-bootstrap";
// import { FaEye, FaEyeSlash, FaFacebookF, FaTwitter } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import { api } from "../../apis/api";
// import toast from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";
// import { Loading } from "../../components/Loading/Loading";
// import { errorHandler } from "../../utils/errorHandler";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../store/slices/userSlice";

// export const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const go = useNavigate();

//   // Redux dispatch
//   const dispatch = useDispatch();

//   // Refs
//   const usernameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   // تسجيل عادي
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = {
//         username: usernameRef.current.value,
//         email: emailRef.current.value,
//         password: passwordRef.current.value,
//       };

//       const response = await api.post("/api/v1/auth/register", data);

//       // حفظ token و user فورًا
//       localStorage.setItem("token", response.data.token);
//       dispatch(setUser(response.data.user));

//       toast.success(response.data.message || "Registered successfully");
//       go("/"); // redirect للصفحة الرئيسية
//     } catch (error) {
//       errorHandler(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // تسجيل Google
//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       const res = await api.post("/api/v1/auth/google-login", {
//         token: credentialResponse.credential,
//       });

//       // حفظ الـ token و الـ user فورًا
//       localStorage.setItem("token", res.data.token);
//       dispatch(setUser(res.data.user));

//       toast.success("Logged in with Google");
//       go("/"); // redirect للصفحة الرئيسية
//     } catch (err) {
//       console.error(err);
//       toast.error("Google login failed");
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <Card className="shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "450px" }}>
//         <Card.Body className="p-4">
//           <h2 className="text-center fw-bold mb-1">Create Your Account</h2>
//           <p className="text-center text-muted mb-4">
//             Join us and start your journey with us today!
//           </p>

//           <Form onSubmit={handleRegister}>
//             {/* Username */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-semibold">Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your username"
//                 ref={usernameRef}
//                 required
//               />
//             </Form.Group>

//             {/* Email */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-semibold">Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 ref={emailRef}
//                 required
//               />
//             </Form.Group>

//             {/* Password */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-semibold">Password</Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   ref={passwordRef}
//                   required
//                 />
//                 <InputGroup.Text onClick={handleTogglePassword} style={{ cursor: "pointer" }}>
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>

//             {/* Register Button */}
//             <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold rounded-3 mb-3">
//               Register
//             </Button>

//             {/* Divider */}
//             <div className="text-center text-muted mb-3">─── Or sign up with ───</div>

//             {/* Social */}
//             <div className="d-flex justify-content-center gap-3 mb-3">
//               <Button variant="outline-primary" className="rounded-circle p-2" title="Register with Facebook">
//                 <FaFacebookF />
//               </Button>

//               <GoogleLogin
//                 onSuccess={handleGoogleLogin}
//                 onError={() => toast.error("Google Login Failed")}
//                 useOneTap
//               />

//               <Button variant="outline-info" className="rounded-circle p-2" title="Register with Twitter">
//                 <FaTwitter />
//               </Button>
//             </div>

//             {/* Login Link */}
//             <p className="text-center mb-0">
//               Already have an account?{" "}
//               <Link to="/login" className="text-decoration-none fw-semibold">
//                 Login
//               </Link>
//             </p>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Register;


import { useRef, useState } from "react";
import { Button, Form, Card, Container, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google official icon
import { GoogleLogin } from "@react-oauth/google";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { errorHandler } from "../../utils/errorHandler";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const go = useNavigate();

  // Redux dispatch
  const dispatch = useDispatch();

  // Refs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  // تسجيل عادي
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await api.post("/api/v1/auth/register", data);

      // حفظ token و user فورًا
      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));

      toast.success(response.data.message || "Registered successfully");
      go("/"); // redirect للصفحة الرئيسية
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await api.post("/api/v1/auth/google-login", {
        token: credentialResponse.credential,
      });

      // حفظ الـ token و الـ user فورًا
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));

      toast.success("Logged in with Google");
      go("/"); // redirect للصفحة الرئيسية
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  if (loading) return <Loading />;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "450px" }}>
        <Card.Body className="p-4">
          <h2 className="text-center fw-bold mb-1">Create Your Account</h2>
          <p className="text-center text-muted mb-4">
            Join us and start your journey with us today!
          </p>

          <Form onSubmit={handleRegister}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                ref={usernameRef}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  ref={passwordRef}
                  required
                />
                <InputGroup.Text onClick={handleTogglePassword} style={{ cursor: "pointer" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Register Button */}
            <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold rounded-3 mb-3">
              Register
            </Button>

            {/* Divider */}
            <div className="text-center text-muted mb-3">─── Or sign up with ───</div>

            {/* Social */}
            <div className="d-flex justify-content-center gap-3 mb-3">
              {/* Facebook */}
              <Button
                variant="outline-primary"
                className="rounded-circle d-flex align-items-center justify-content-center p-2"
                style={{ width: "45px", height: "45px" }}
                title="Register with Facebook"
              >
                <FaFacebookF />
              </Button>

              {/* Google */}
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google Login Failed")}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="rounded-circle d-flex align-items-center justify-content-center p-2"
                    style={{
                      width: "45px",
                      height: "45px",
                      border: "1px solid #ddd",
                      background: "#fff",
                    }}
                    title="Register with Google"
                  >
                    <FcGoogle size={24} />
                  </Button>
                )}
              />

              {/* Twitter */}
              <Button
                variant="outline-info"
                className="rounded-circle d-flex align-items-center justify-content-center p-2"
                style={{ width: "45px", height: "45px" }}
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

export default Register;