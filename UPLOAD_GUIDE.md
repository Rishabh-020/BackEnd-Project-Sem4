# How to Upload Profile Picture - Quick Guide

## Step 1: Login/Create Account
- Go to `/login` page
- Either login with existing account or create a new account
- Click "Login" or "Sign Up" button

## Step 2: Navigate to Profile
After successful login, you'll see a **👤 Profile Button** in the header with your name displayed.

Click on this button to go to your profile page.

## Step 3: Upload Picture
On the profile page (`/profile`), you'll see:
- Your current profile picture (purple default avatar if none uploaded)
- An "Upload Profile Picture" section with:
  - A drag & drop area that says "Click to select image or drag & drop"
  - A file input to select an image
  - A preview of the selected image
  - An "Upload" button

## Step 4: Select Image
1. Click on the upload area
2. Select an image from your computer (JPEG, JPG, PNG, or GIF)
3. Preview the image
4. Click "Upload" button
5. Wait for success message

## Features
✅ Upload profile picture (max 5MB)
✅ Supports: JPEG, JPG, PNG, GIF
✅ See preview before uploading
✅ Delete button on avatar (✕) to remove picture
✅ Profile info shows name, email, user ID
✅ Logout button available

## Troubleshooting

### Can't see profile button?
- Make sure you're logged in
- Check the header - profile button only appears for logged-in users
- Alternatively, manually navigate to `/profile` if logged in

### Upload not working?
- Check file size (max 5MB)
- Check file type (JPEG, JPG, PNG, GIF only)
- Make sure backend server is running on port 5000

### Need to change API URL?
- Edit: `client/src/utils/profilePictureService.js`
- Change: `const API_BASE_URL = "http://localhost:5000/api/auth";`
- Update to your server's actual address

---

**Backend must be running for uploads to work!**
Run: `npm run dev` or `nodemon server.js` in the server folder
