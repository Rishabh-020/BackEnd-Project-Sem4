import React from "react";

export default function SignupForm({ form, updateForm, handleSignup }) {
  return (
    <form className="auth-form active" onSubmit={handleSignup}>
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Enter your full name"
          value={form.signupName}
          onChange={(e) => updateForm("signupName", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.signupEmail}
          onChange={(e) => updateForm("signupEmail", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Create a password"
          value={form.signupPassword}
          onChange={(e) => updateForm("signupPassword", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Confirm your password"
          value={form.signupConfirmPassword}
          onChange={(e) => updateForm("signupConfirmPassword", e.target.value)}
          required
        />
      </div>

      <div className="form-options">
        <label className="checkbox-container">
          <input type="checkbox" required />
          <span className="checkmark"></span>I agree to the{" "}
          <a href="#">Terms & Conditions</a>
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Create Account
      </button>

      <div className="form-footer">
        <p>
          Already have an account?{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Login
          </a>
        </p>
      </div>
    </form>
  );
}
