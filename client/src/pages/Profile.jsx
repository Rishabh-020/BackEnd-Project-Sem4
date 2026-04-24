import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProfilePicture } from "../utils/profilePictureService";
import UserAvatar from "../components/UserAvatar";
import "../styles/profile.css";

const CURRENT_USER_KEY = "wandersphere_current_user";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileUser, setProfileUser] = useState(user);
  const [uploadRefresh, setUploadRefresh] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!user) {
      const saved = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
      if (!saved) {
        navigate("/login");
        return;
      }
      setProfileUser(saved);
    }
  }, [user, navigate]);

  const handleUploadSuccess = (result) => {
    const updatedUser = result.user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    setProfileUser(updatedUser);
    setUser?.(updatedUser);
    setUploadRefresh((prev) => prev + 1);
  };

  const openImagePicker = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleImageSelected = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadProfilePicture(profileUser.id, file);
      handleUploadSuccess(result);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setUser?.(null);
    setProfileUser(null);
    navigate("/login");
  };

  if (!profileUser) {
    return <div className="profile-container"><p>Loading...</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>User Profile</h1>
        </div>

        <div className="profile-content">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelected}
            style={{ display: "none" }}
          />

          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <button
              type="button"
              className="avatar-trigger-btn"
              onClick={openImagePicker}
              title="Click to change profile picture"
            >
              <UserAvatar userId={profileUser.id} refreshKey={uploadRefresh} />
            </button>
            <div className="profile-info">
              <h2>{profileUser.name}</h2>
              <p className="email">{profileUser.email}</p>
              <p className="user-id">User ID: {profileUser.id}</p>
              <button
                type="button"
                className="toggle-upload-link"
                onClick={openImagePicker}
              >
                {isUploading ? "Uploading..." : "Change profile photo"}
              </button>
              {uploadError ? <p className="avatar-error">{uploadError}</p> : null}
            </div>
          </div>

          {/* User Details */}
          <div className="profile-details">
            <h3>Account Details</h3>
            <div className="detail-item">
              <label>Name:</label>
              <span>{profileUser.name}</span>
            </div>
            <div className="detail-item">
              <label>Email:</label>
              <span>{profileUser.email}</span>
            </div>
            {profileUser.createdAt && (
              <div className="detail-item">
                <label>Member Since:</label>
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

          {/* Logout Button */}
          <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
