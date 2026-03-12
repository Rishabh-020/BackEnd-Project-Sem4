import React from "react";

export default function LoginTabs({ activeTab, setActiveTab }) {
  return (
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
  );
}
