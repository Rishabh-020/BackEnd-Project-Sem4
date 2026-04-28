import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function UserCard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="user-card">
      <div className="user-avatar">{initials}</div>
      <h3 className="user-card-name">Welcome back, {user?.name}!</h3>
      <p className="user-card-email">{user?.email}</p>
      <div className="user-card-actions">
        <button className="btn-outline" onClick={() => navigate("/vlogs")}>
          Browse Vlogs
        </button>
        <button className="btn-danger" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
