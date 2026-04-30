import React, { useState } from "react";
import { useAuthForm } from "../hooks/useAuthForm";

export function SignupForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { loading, error, success, handleSignup } = useAuthForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSignup(name, email, password, confirm);
    if (success) onSuccess?.();
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
      <div className="field-group">
        <label>Full name</label>
        <div className="input-wrap">
          <span className="input-icon">👤</span>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field-group">
        <label>Email address</label>
        <div className="input-wrap">
          <span className="input-icon">✉</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field-group">
        <label>Password</label>
        <div className="input-wrap">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field-group">
        <label>Confirm password</label>
        <div className="input-wrap">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Repeat password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? <span className="btn-loader" /> : "Create account →"}
      </button>
    </form>
  );
}
