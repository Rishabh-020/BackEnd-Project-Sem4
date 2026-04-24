import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import UserAvatar from "../components/UserAvatar";
import "../styles/profile.css";

const CURRENT_USER_KEY = "wandersphere_current_user";

const Settings = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(user);
  const [uploadRefresh, setUploadRefresh] = useState(0);

  useEffect(() => {
    if (!user) {
      const saved = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
      if (!saved) {
        navigate("/login");
        return;
      }
      setProfileUser(saved);
    } else {
      setProfileUser(user);
    }
  }, [user, navigate]);

  const handleUploadSuccess = (result) => {
    const updatedUser = result.user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    setProfileUser(updatedUser);
    setUser?.(updatedUser);
    setUploadRefresh(prev => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setUser?.(null);
    setProfileUser(null);
    navigate("/login");
  };

  if (!profileUser) {
    return (
      <div className="profile-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>⚙️ Settings</h1>
        </div>

        <div className="profile-content">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <UserAvatar userId={profileUser.id} refreshKey={uploadRefresh} />
            <div className="profile-info">
              <h2>{profileUser.name}</h2>
              <p className="email">{profileUser.email}</p>
              <p className="user-id">User ID: {profileUser.id}</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="profile-upload-section">
            <ProfilePictureUpload 
              userId={profileUser.id} 
              onUploadSuccess={handleUploadSuccess}
            />
          </div>

          {/* User Details */}
          <div className="profile-details">
            <h3>Account Information</h3>
            <div className="detail-item">
              <label>Full Name:</label>
              <span>{profileUser.name}</span>
            </div>
            <div className="detail-item">
              <label>Email Address:</label>
              <span>{profileUser.email}</span>
            </div>
            <div className="detail-item">
              <label>User ID:</label>
              <span>{profileUser.id}</span>
            </div>
            {profileUser.createdAt && (
              <div className="detail-item">
                <label>Account Created:</label>
                <span>{new Date(profileUser.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            {profileUser.loginCount && (
              <div className="detail-item">
                <label>Total Logins:</label>
                <span>{profileUser.loginCount}</span>
              </div>
            )}
          </div>

          {/* Profile Actions */}
          <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
