# Profile Picture Feature - Implementation Guide

## Overview
This feature allows users to upload, view, and delete profile pictures. The implementation includes both backend (Node.js/Express) and frontend (React) components.

## Backend Setup

### 1. Files Created/Modified

**New Files:**
- `server/src/middleware/upload.js` - Multer configuration for file uploads
- `server/src/controllers/auth.controller.js` - Added profile picture handling functions
- `server/src/routes/auth.routes.js` - New routes for profile picture operations

**Modified Files:**
- `server/src/app.js` - Added static file serving for uploads
- `server/package.json` - Added multer dependency

### 2. Backend Endpoints

#### Upload Profile Picture
```
POST /api/auth/users/:id/profile-picture
Content-Type: multipart/form-data

Body:
- profilePicture: [image file]
- userId: [user id]

Response:
{
  "message": "Profile picture uploaded successfully",
  "user": { /* user data without password */ }
}
```

#### Get Profile Picture
```
GET /api/auth/users/:id/profile-picture

Response:
{
  "profilePicture": "/uploads/profilePictures/user-123-1234567890.jpg"
}
```

#### Delete Profile Picture
```
DELETE /api/auth/users/:id/profile-picture

Response:
{
  "message": "Profile picture deleted successfully",
  "user": { /* user data without password */ }
}
```

### 3. Installation

In the server directory, install multer:
```bash
npm install multer@1.4.5-lts.1
```

### 4. Upload Directory
- Uploads are stored in: `server/uploads/profilePictures/`
- This directory is created automatically on first upload

## Frontend Setup

### 1. Files Created
- `client/src/utils/profilePictureService.js` - API service for profile picture operations
- `client/src/components/ProfilePictureUpload.jsx` - React component for uploading

### 2. Usage in React Components

#### Using the ProfilePictureUpload Component
```jsx
import ProfilePictureUpload from "./components/ProfilePictureUpload";

function UserProfile() {
  const userId = 123; // Replace with actual user ID

  const handleUploadSuccess = (result) => {
    console.log("Profile picture updated:", result);
    // Update UI or state as needed
  };

  return (
    <div>
      <h1>User Profile</h1>
      <ProfilePictureUpload 
        userId={userId} 
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
```

#### Using the Service Directly
```jsx
import { 
  uploadProfilePicture, 
  getProfilePictureUrl, 
  deleteProfilePicture 
} from "./utils/profilePictureService";

// Upload
const file = fileInput.files[0];
const result = await uploadProfilePicture(userId, file);

// Fetch profile picture URL
const pictureUrl = await getProfilePictureUrl(userId);
if (pictureUrl) {
  document.getElementById("profileImg").src = pictureUrl;
}

// Delete profile picture
await deleteProfilePicture(userId);
```

### 3. Displaying Profile Picture in Components
```jsx
import { useEffect, useState } from "react";
import { getProfilePictureUrl } from "../utils/profilePictureService";

function UserAvatar({ userId }) {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        const url = await getProfilePictureUrl(userId);
        setPictureUrl(url);
      } catch (error) {
        console.error("Failed to load profile picture:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPicture();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <img
      src={pictureUrl || "/default-avatar.png"}
      alt="User Avatar"
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
  );
}

export default UserAvatar;
```

## Features

- ✅ Upload profile pictures (JPEG, JPG, PNG, GIF)
- ✅ Maximum file size: 5MB
- ✅ Automatic old image deletion on re-upload
- ✅ File validation (type and size)
- ✅ Profile picture URL stored in user data
- ✅ View profile picture by user ID
- ✅ Delete profile picture
- ✅ Static file serving for uploaded images

## File Structure
```
server/
  uploads/
    profilePictures/  (auto-created)
  src/
    middleware/
      upload.js
    controllers/
      auth.controller.js
    routes/
      auth.routes.js

client/
  src/
    components/
      ProfilePictureUpload.jsx
    utils/
      profilePictureService.js
```

## Database Updates
User data in `Data/login.json` now includes:
- `profilePicture`: URL to the uploaded image
- `updatedAt`: Timestamp of last update

## Error Handling
- File type validation (only images allowed)
- File size validation (max 5MB)
- User not found errors
- File deletion from disk on removal

## Notes
- Uploaded files are stored on the server filesystem
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- Profile picture URLs are relative paths served via Express static middleware
- All uploaded files are automatically deleted when a user uploads a new picture or deletes it
