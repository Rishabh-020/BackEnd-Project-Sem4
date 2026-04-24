import React, { useState } from "react";
import { uploadProfilePicture } from "../utils/profilePictureService";
import "./ProfilePictureUpload.css";

const ProfilePictureUpload = ({ userId, onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only image files are allowed (jpeg, jpg, png, gif)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setFileName(file.name);
    setError(null);
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById("profilePictureInput");
    const file = fileInput?.files[0];

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadProfilePicture(userId, file);
      setPreview(null);
      setFileName(null);
      fileInput.value = ""; // Reset input
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (err) {
      setError(err.message || "Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-picture-upload">
      <h3>📸 Upload Profile Picture</h3>
      
      <div className="upload-input-wrapper">
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="file-input"
        />
        <label htmlFor="profilePictureInput" className="file-input-label">
          {fileName ? `📁 ${fileName}` : "Click to select image or drag & drop"}
        </label>
      </div>

      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" />
          <p className="preview-text">Image preview</p>
        </div>
      )}

      {error && <p className="error-message">❌ {error}</p>}

      <button 
        onClick={handleUpload} 
        disabled={loading || !preview}
        className="upload-button"
      >
        {loading ? "⏳ Uploading..." : "✓ Upload"}
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
