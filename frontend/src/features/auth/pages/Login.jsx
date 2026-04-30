import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../../../styles/login.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    login,
    signup,
    googleSignIn,
    logout,
    loading,
    error,
    triggerToast,
  } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Get the redirect path from location state, or default to "/"
  const from = location.state?.from?.pathname || "/";

  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Signup form fields
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  // Removed local toast state in favor of global triggerToast

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    // Validation
    if (!signupUsername.trim()) return setSignupError("Username is required");
    if (!validateEmail(signupEmail))
      return setSignupError("Enter a valid email");
    if (signupPassword.length < 6)
      return setSignupError("Password must be at least 6 characters");
    if (signupPassword !== signupConfirmPassword)
      return setSignupError("Passwords do not match");

    try {
      const response = await signup(
        signupUsername,
        signupEmail,
        signupPassword,
        signupConfirmPassword,
      );

      if (response.success) {
        triggerToast(
          "Registered successfully! Please login to continue.",
          "success",
        );
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirmPassword("");
        setActiveTab("login");
      } else {
        setSignupError(response.message || "Signup failed");
      }
    } catch (err) {
      setSignupError(err.message || "An error occurred during signup");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    // Validation
    if (!validateEmail(loginEmail)) return setLoginError("Enter a valid email");
    if (!loginPassword) return setLoginError("Password is required");

    try {
      const response = await login(loginEmail, loginPassword);

      if (response.success) {
        triggerToast("Logged in successfully!", "success");
        setLoginEmail("");
        setLoginPassword("");
        setRememberMe(false);
        // Auto redirect after a delay
        setTimeout(() => navigate(from, { replace: true }), 1500);
      } else {
        setLoginError(response.message || "Login failed");
      }
    } catch (err) {
      setLoginError(err.message || "An error occurred during login");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await googleSignIn(credentialResponse.credential);
      if (response.success) {
        triggerToast("Logged in successfully!", "success");
        setTimeout(() => navigate(from, { replace: true }), 1500);
      } else {
        triggerToast(response.message || "Google login failed", "error");
      }
    } catch (err) {
      triggerToast("Google login failed", "error");
    }
  };

  const handleLogout = async () => {
    await logout();
    triggerToast("Logged out successfully", "success");
    navigate("/");
  };

  return (
    <main className="login-main">
      {/* Animated background elements */}
      <div className="auth-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-container">
        <div className="login-card glass-morphism">
          <div className="login-header">
            <h2>Join our community of travel enthusiasts</h2>
            <p>Share your adventures and discover new destinations</p>
          </div>

          {/* If logged in */}
          {isAuthenticated && user ? (
            <div className="user-info-section">
              <div className="user-welcome">
                <i className="fas fa-user-circle"></i>
                <h3>Welcome back, {user.username}!</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-actions">
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
                <button
                  className="continue-btn"
                  onClick={() => navigate("/vlogs")}
                >
                  Continue to Vlogs
                </button>
              </div>
            </div>
          ) : (
            <div id="form-section">
              {/* Tabs */}
              <div className="form-tabs">
                <button
                  className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              <div className="form-content">
                {/* LOGIN FORM */}
                {activeTab === "login" && (
                  <form className="auth-form active" onSubmit={handleLogin}>
                    {loginError && (
                      <div className="error-message">{loginError}</div>
                    )}
                    <div className="input-group">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          setLoginError("");
                        }}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          setLoginError("");
                        }}
                        required
                      />
                    </div>
                    <div className="form-options">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Remember me
                      </label>
                      <a href="#" className="forgot-password">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login to WanderSphere"}
                    </button>
                    <div className="form-footer">
                      <p>
                        Don't have an account?{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("signup");
                          }}
                        >
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </form>
                )}

                {/* SIGNUP FORM */}
                {activeTab === "signup" && (
                  <form className="auth-form active" onSubmit={handleSignup}>
                    {signupError && (
                      <div className="error-message">{signupError}</div>
                    )}
                    <div className="input-group">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        value={signupUsername}
                        onChange={(e) => {
                          setSignupUsername(e.target.value);
                          setSignupError("");
                        }}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={signupEmail}
                        onChange={(e) => {
                          setSignupEmail(e.target.value);
                          setSignupError("");
                        }}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Create a password"
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          setSignupError("");
                        }}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        value={signupConfirmPassword}
                        onChange={(e) => {
                          setSignupConfirmPassword(e.target.value);
                          setSignupError("");
                        }}
                        required
                      />
                    </div>
                    <div className="form-options">
                      <label className="checkbox-container">
                        <input type="checkbox" required />
                        <span className="checkmark"></span>I agree to the{" "}
                        <a href="#">Terms &amp; Conditions</a>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </button>
                    <div className="form-footer">
                      <p>
                        Already have an account?{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("login");
                          }}
                        >
                          Login
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Social login */}
              <div className="social-login">
                <div className="divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <div className="google-btn-container">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() =>
                        showMessage("Google Login Failed", "error")
                      }
                      theme="filled_blue"
                      shape="pill"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
