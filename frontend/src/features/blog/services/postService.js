import axios from "axios";
import Cookies from "js-cookie";

// Using a fallback to localhost:3000 if the env variable is missing
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_URL = `${BASE_URL}/posts`;

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAllPosts = async () => {
  const response = await axios.get(`${API_URL}?t=${new Date().getTime()}`);
  return response.data;
};

const getMyPosts = async () => {
  const response = await axios.get(`${API_URL}/me`, getAuthHeader());
  return response.data;
};

const createPost = async (postData) => {
  console.log("Attempting to create post with data:", postData);
  try {
    const response = await axios.post(API_URL, postData, getAuthHeader());
    console.log("Post creation success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Post creation error details:", error.response?.data || error.message);
    throw error;
  }
};

const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_URL}/${id}`, postData, getAuthHeader());
  return response.data;
};

const postService = {
  getAllPosts,
  getMyPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};

export default postService;
