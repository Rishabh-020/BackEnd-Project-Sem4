import React from "react";

export default function SocialLogin({ showMessage }) {
  return (
    <div className="social-login">
      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="social-buttons">
        <button
          className="social-btn google"
          onClick={() => showMessage("Google login coming soon!")}
        >
          <i className="fab fa-google"></i> Google
        </button>

        <button
          className="social-btn facebook"
          onClick={() => showMessage("Facebook login coming soon!")}
        >
          <i className="fab fa-facebook-f"></i> Facebook
        </button>
      </div>
    </div>
  );
}
