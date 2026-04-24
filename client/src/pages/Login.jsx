import React, { useState, useEffect } from "react";
import "../styles/login.css";
import LoginTabs from "../components/Login/LoginTabs";
import LoginForm from "../components/Login/LoginForm";
import SignupForm from "../components/Login/SignupForm";
import SocialLogin from "../components/Login/SocialLogin";
import Toast from "../components/Login/Toast";
import UserInfo from "../components/Login/UserInfo";

const USER_DATA_KEY = "wandersphere_users";
const CURRENT_USER_KEY = "wandersphere_current_user";

const Login = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  const [form, setForm] = useState({
    loginEmail: "",
    loginPassword: "",
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    signupConfirmPassword: "",
    rememberMe: false,
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) ||
      JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
    if (saved) setCurrentUser(saved);
  }, []);

  const updateForm = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const showMessage = (message, type = "success") => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 2500);
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const saveUser = (user) =>
    localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify([...(JSON.parse(localStorage.getItem(USER_DATA_KEY)) || []), user])
    );

  const persistCurrentUser = (user, rememberMe) => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { signupName, signupEmail, signupPassword, signupConfirmPassword } =
      form;

    if (!signupName.trim()) return showMessage("Enter your name", "error");
    if (!validateEmail(signupEmail))
      return showMessage("Enter a valid email", "error");
    if (signupPassword.length < 6)
      return showMessage("Password must be at least 6 chars", "error");
    if (signupPassword !== signupConfirmPassword)
      return showMessage("Passwords do not match", "error");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Signup failed");
      }

      const newUser = data.user;
      saveUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });

      showMessage(data.message || "Account created! Please login.");

      setForm((p) => ({
        ...p,
        signupName: "",
        signupEmail: "",
        signupPassword: "",
        signupConfirmPassword: "",
      }));

      setActiveTab("login");
    } catch (error) {
      showMessage(
        error.response?.data?.error || error.response?.data?.message || "Signup failed",
        "error"
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword, rememberMe } = form;

    if (!validateEmail(loginEmail))
      return showMessage("Enter valid email", "error");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Invalid email or password");
      }

      const loggedUser = data.user;
      persistCurrentUser(loggedUser, rememberMe);

      setCurrentUser(loggedUser);
      if (setUser) setUser(loggedUser);

      showMessage(data.message || "Login successful!");

      setForm((p) => ({ ...p, loginEmail: "", loginPassword: "" }));
    } catch (error) {
      showMessage(
        error.response?.data?.error || error.response?.data?.message || "Invalid email or password",
        "error"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
    if (setUser) setUser(null);
    showMessage("Logged out successfully");
  };

  return (
    <>
      {toast.show && <Toast type={toast.type} message={toast.message} />}

      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2>Join our community of travel enthusiasts</h2>
              <p>Share your adventures and discover new destinations</p>
            </div>

            {currentUser ? (
              <UserInfo currentUser={currentUser} handleLogout={handleLogout} />
            ) : (
              <div id="form-section">
                <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "login" ? (
                  <LoginForm
                    form={form}
                    updateForm={updateForm}
                    handleLogin={handleLogin}
                  />
                ) : (
                  <SignupForm
                    form={form}
                    updateForm={updateForm}
                    handleSignup={handleSignup}
                  />
                )}

                <SocialLogin showMessage={showMessage} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
