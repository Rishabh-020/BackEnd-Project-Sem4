// Profile Picture API Service

const API_BASE_URL = "http://localhost:5000/api/auth";
const BACKEND_ORIGIN = new URL(API_BASE_URL).origin;

function toAbsoluteUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${BACKEND_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Upload profile picture
export const uploadProfilePicture = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userId);

    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile-picture`, {
      method: "POST",
      body: formData,
      // Note: Don't set Content-Type header, browser will set it with boundary
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    if (data?.user?.profilePicture) {
      data.user.profilePicture = toAbsoluteUrl(data.user.profilePicture);
    }
    return data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

// Get profile picture URL
export const getProfilePictureUrl = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile-picture`);

    if (response.status === 404) {
      // No profile picture uploaded yet - this is normal
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch profile picture");
    }

    const data = await response.json();
    return toAbsoluteUrl(data.profilePicture);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return null; // Return null on error instead of throwing
  }
};

// Delete profile picture
export const deleteProfilePicture = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile-picture`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
};
