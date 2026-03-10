const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

router.get("/:id", postController.getPostById);

module.exports = router;
