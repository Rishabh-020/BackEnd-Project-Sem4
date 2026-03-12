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

  const getStoredUsers = () =>
    JSON.parse(localStorage.getItem(USER_DATA_KEY)) || [];

  const saveUser = (user) =>
    localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify([...getStoredUsers(), user])
    );

  const handleSignup = (e) => {
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
    if (getStoredUsers().some((u) => u.email === signupEmail))
      return showMessage("Email already registered", "error");

    saveUser({
      id: Date.now(),
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    });

    showMessage("Account created! Please login.");

    setForm((p) => ({
      ...p,
      signupName: "",
      signupEmail: "",
      signupPassword: "",
      signupConfirmPassword: "",
    }));

    setActiveTab("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword, rememberMe } = form;

    if (!validateEmail(loginEmail))
      return showMessage("Enter valid email", "error");

    const found = getStoredUsers().find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (!found) return showMessage("Invalid email or password", "error");

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(CURRENT_USER_KEY, JSON.stringify(found));

    setCurrentUser(found);
    if (setUser) setUser(found);

    showMessage("Login successful!");

    setForm((p) => ({ ...p, loginEmail: "", loginPassword: "" }));
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
