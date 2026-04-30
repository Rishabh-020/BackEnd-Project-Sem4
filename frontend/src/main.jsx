import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
