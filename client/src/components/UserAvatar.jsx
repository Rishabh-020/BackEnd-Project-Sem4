import React, { useEffect, useState } from "react";
import { getProfilePictureUrl, deleteProfilePicture } from "../utils/profilePictureService";

const UserAvatar = ({ userId, refreshKey = 0 }) => {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPicture = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const url = await getProfilePictureUrl(userId);
        setPictureUrl(url);
      } catch (err) {
        console.error("Failed to load profile picture:", err);
        setError("Could not load profile picture");
      } finally {
        setLoading(false);
      }
    };

    fetchPicture();
  }, [userId, refreshKey]); // Re-fetch when refreshKey changes

  const handleDeletePicture = async () => {
    if (!window.confirm("Are you sure you want to delete your profile picture?")) {
      return;
    }

    try {
      await deleteProfilePicture(userId);
      setPictureUrl(null);
    } catch (err) {
      setError("Failed to delete profile picture");
      console.error("Error deleting profile picture:", err);
    }
  };

  if (loading) {
    return (
      <div className="user-avatar loading">
        <p>Loading avatar...</p>
      </div>
    );
  }

  return (
    <div className="user-avatar-wrapper">
      <img
        src={pictureUrl || "/default-avatar.svg"}
        alt="User Avatar"
        className="user-avatar"
        onError={(e) => {
          e.target.src = "/default-avatar.svg";
        }}
      />
      {error && <p className="avatar-error">{error}</p>}
      {pictureUrl && (
        <button 
          className="delete-avatar-btn" 
          onClick={handleDeletePicture}
          title="Delete profile picture"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default UserAvatar;
