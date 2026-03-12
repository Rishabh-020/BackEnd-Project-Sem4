import React from "react";

export default function LoginForm({ form, updateForm, handleLogin }) {
  return (
    <form className="auth-form active" onSubmit={handleLogin}>
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.loginEmail}
          onChange={(e) => updateForm("loginEmail", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Enter your password"
          value={form.loginPassword}
          onChange={(e) => updateForm("loginPassword", e.target.value)}
          required
        />
      </div>

      <div className="form-options">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={form.rememberMe}
            onChange={(e) => updateForm("rememberMe", e.target.checked)}
          />
          <span className="checkmark"></span> Remember me
        </label>

        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </div>

      <button type="submit" className="submit-btn">
        Login to WanderSphere
      </button>

      <div className="form-footer">
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}
