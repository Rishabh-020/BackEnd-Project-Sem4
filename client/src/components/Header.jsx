import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      // Logout
      localStorage.removeItem("wandersphere_current_user");
      sessionStorage.removeItem("wandersphere_current_user");
      setUser(null);
      navigate("/login");
    } else {
      // Go to login
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setOpen(false);
  };

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

            {user && (
              <li>
                <button className="profile-btn" onClick={handleProfileClick}>
                  <img
                    src={user.profilePicture || "/default-avatar.svg"}
                    alt="Profile"
                    className="header-avatar"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.svg";
                    }}
                  />
                  <span className="profile-name">{user.name}</span>
                </button>
              </li>
            )}

            <li id="auth-nav-item">
              <button className="login-btn" onClick={handleAuthClick}>
                {user ? "Logout" : "Login / Sign Up"}
              </button>
            </li>
          </ul>
        </nav>

        <div className="mobile-menu-toggle" onClick={() => setOpen(!open)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
}
