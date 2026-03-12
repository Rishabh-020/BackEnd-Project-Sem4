import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate("/login");
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
