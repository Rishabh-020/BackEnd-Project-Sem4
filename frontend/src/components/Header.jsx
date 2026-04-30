import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header({ user }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { initiateLogout } = useAuth();

  function handleLoginClick() {
    navigate("/login");
  }

  function handleLogout() {
    initiateLogout();
  }

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <h1>WanderSphere</h1>
        </div>
        <nav>
          <ul className={open ? "show" : ""}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/vlogs">Vlogs</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li className="theme-toggle-item">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
              >
                {theme === "light" ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
              </button>
            </li>
            <li id="auth-nav-item">
              {user ? (
                <div className="user-auth-container">
                  <button
                    className="profile-circle-btn"
                    onClick={() => navigate("/profile")}
                    title={`View Profile (${user.username})`}
                  >
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </button>
                  <button
                    className="logout-btn-header"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              ) : (
                <button
                  className="login-btn"
                  id="auth-btn"
                  onClick={handleLoginClick}
                >
                  Login/Sign Up
                </button>
              )}
            </li>
          </ul>
        </nav>
        <div className="mobile-menu-toggle" onClick={() => setOpen((v) => !v)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
}
