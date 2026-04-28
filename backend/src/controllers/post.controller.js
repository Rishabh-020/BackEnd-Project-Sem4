import Post from "../models/post.model.js";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    console.log("Backend: Fetching posts...");
    // Populating author with specific fields for safety and performance
    const posts = await Post.find()
      .populate("author", "username profilePicture")
      .sort("-createdAt");

    console.log("Backend: Fetched posts count:", posts?.length || 0);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Backend: Error in getPosts:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username profilePicture",
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Backend: Error in getPost:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    console.log("Backend: Received createPost request:", req.body);
    // Add user to req.body
    req.body.author = req.userId;

    const post = await Post.create(req.body);
    console.log("Backend: Post created successfully:", post._id);

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error("Backend: Post creation error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get posts by logged in user
// @route   GET /api/posts/me
// @access  Private
export const getMyPosts = async (req, res) => {
  try {
    console.log("Backend: Fetching personal posts for user:", req.userId);
    const posts = await Post.find({ author: req.userId });

    console.log("Backend: Fetched personal posts count:", posts?.length || 0);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Backend: Error in getMyPosts:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Make sure user is post owner
    if (post.author.toString() !== req.userId && req.userRole !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized to delete this post",
        });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Make sure user is post owner
    if (post.author.toString() !== req.userId && req.userRole !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized to update this post",
        });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
