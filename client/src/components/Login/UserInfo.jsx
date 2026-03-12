import React from "react";

export default function UserInfo({ currentUser, handleLogout }) {
  if (!currentUser) return null;

  return (
    <div className="user-info-section">
      <div className="user-welcome">
        <i className="fas fa-user-circle"></i>
        <h3>Welcome back, {currentUser.name}!</h3>
        <p>{currentUser.email}</p>
      </div>

      <div className="user-actions">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>

        <button
          className="continue-btn"
          onClick={() => (window.location.href = "/vlogs")}
        >
          Continue to Vlogs
        </button>
      </div>
    </div>
  );
}
