import Cookies from "js-cookie";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const postService = {
  // Get all posts
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return response.json();
  },

  // Get current user's posts
  getMyPosts: async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${API_BASE_URL}/posts/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Create a new post
  createPost: async (postData) => {
    const token = Cookies.get("token");
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  // Delete a post
  deletePost: async (postId) => {
    const token = Cookies.get("token");
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export default postService;
