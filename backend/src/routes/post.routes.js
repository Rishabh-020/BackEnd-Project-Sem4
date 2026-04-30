import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  getMyPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/me", verifyToken, getMyPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
