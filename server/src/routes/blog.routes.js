const express = require("express");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

// Blog CRUD routes
router.post("/", blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

// Like/Save/Share routes
router.post("/:id/like", blogController.toggleLikeBlog);
router.post("/:id/save", blogController.toggleSaveBlog);
router.post("/:id/share", blogController.incrementShare);

// Comment routes
router.post("/:id/comments", blogController.addComment);
router.delete("/:blogId/comments/:commentId", blogController.deleteComment);

module.exports = router;
