import React, {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import useUser from "../hooks/useUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useUser();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (auth.token && !auth.user) {
      auth.fetchUserData();
    }
  }, []);

  const triggerToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  }, []);

  const initiateLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = async () => {
    await auth.logout();
    setShowLogoutModal(false);
    triggerToast("Logged out successfully", "success");
    // Hard refresh or redirect can be done by component, but state updates immediately.
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

      {/* Global Toast */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}

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
