# Quick Setup: Profile Picture Upload Feature

## Current Status
✅ All backend setup complete
✅ Frontend components created
⏳ Manual route connection needed

## How to Access Profile Picture Upload NOW

### Option 1: Direct URL Access (Easiest)
1. **Login** at `http://localhost:5173/login`
2. Create account or login
3. **Go directly to**: `http://localhost:5173/profile`
4. You'll see the upload interface immediately!

### Option 2: Via Profile Button
1. **Login** at `http://localhost:5173/login`
2. After successful login, you'll see **👤 Your Name** button in header
3. Click that button to go to profile page
4. See the upload interface

## What You'll See
On the profile page:
- Your profile avatar (purple default if no image uploaded)
- Upload section with:
  - "Click to select image or drag & drop" area
  - File preview
  - Upload button
- Account details
- Logout button
- Delete avatar button (✕) appears after upload

## Required: Backend Must Be Running

Open a terminal in the server folder and run:
```bash
npm run dev
# OR
nodemon server.js
```

The server should run on `http://localhost:5000`

## To Make It Permanent (One-Time Setup)

### Step 1: Update App.jsx
In `client/src/App.jsx`, add this import at the top:
```jsx
import Settings from "./pages/Settings";
```

### Step 2: Add Route
In the `<Routes>` section, add:
```jsx
<Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
```

### Step 3: Add Settings Link to Header
In `client/src/components/Header.jsx`, after the profile button, add:
```jsx
{user && (
  <li>
    <a href="/settings" className="settings-link">
      ⚙️ Settings
    </a>
  </li>
)}
```

### Step 4: Update Header Navigation Import
Add to `Header.jsx` imports if needed

After these steps, Settings will be accessible from header when logged in!

---

**Files created for you:**
- ✅ `client/src/pages/Settings.jsx` - Settings page with upload
- ✅ `client/src/utils/profilePictureService.js` - API service
- ✅ `client/src/components/ProfilePictureUpload.jsx` - Upload component
- ✅ `client/src/components/UserAvatar.jsx` - Avatar display
- ✅ `client/src/styles/profile.css` - Styling
- ✅ `server/src/middleware/upload.js` - File upload middleware
- ✅ Backend controllers updated
- ✅ Backend routes updated
