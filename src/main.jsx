// // Imports
// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
// import { store } from "./store/store.js";
// import { Provider } from "react-redux";
// import { StrictMode } from "react";
// import App from "./App.jsx";

// // Css Global
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </StrictMode>
// );


// Imports
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import App from "./App.jsx";

// Css Global
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Google OAuth
import { GoogleOAuthProvider } from "@react-oauth/google";

// ضع هنا الـ Client ID اللي حصلت عليه من Google
const clientId = "1086892777662-327gkjn10hj584lr39fa8hflhqpmng5v.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);