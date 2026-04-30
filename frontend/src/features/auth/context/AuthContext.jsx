import React, {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import useUser from "../hooks/useUser";

import { toast, Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (auth.token && !auth.user) {
      auth.fetchUserData();
    }
  }, []);

  const triggerToast = useCallback((message, type = "success") => {
    if (type === "success") {
      toast.success(message, {
        style: {
          background: "#111827",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid #374151",
        },
        iconTheme: {
          primary: "#4361ee",
          secondary: "#fff",
        },
      });
    } else {
      toast.error(message, {
        style: {
          background: "#111827",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid #374151",
        },
      });
    }
  }, []);

  const initiateLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = async () => {
    await auth.logout();
    setShowLogoutModal(false);
    triggerToast("Logged out successfully", "success");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const value = {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    signup: auth.signup,
    login: auth.login,
    googleSignIn: auth.googleSignIn,
    logout: auth.logout,
    fetchUserData: auth.fetchUserData,
    updateProfile: auth.updateProfile,
    isAuthenticated: auth.isAuthenticated,
    triggerToast,
    initiateLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      <Toaster position="top-right" reverseOrder={false} />

      {/* Global Logout Confirm Modal */}
      {showLogoutModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="confirm-modal-actions">
              <button className="cancel-btn" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
