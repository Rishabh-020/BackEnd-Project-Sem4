import React, { useState } from "react";
import { useAuthForm } from "../hooks/useAuthForm";

export function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { loading, error, handleLogin } = useAuthForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    if (!error) onSuccess?.();
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {error && <div className="form-error">{error}</div>}
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
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="pw-toggle"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? <span className="btn-loader" /> : "Sign in →"}
      </button>
    </form>
  );
}
