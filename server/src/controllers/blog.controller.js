const Blog = require("../models/Blog");

// Get all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
}

// Get single blog by ID
async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
}

// Create a new blog
async function createBlog(req, res) {
  try {
    const { title, content, image, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: "Title, content, and author are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      image: image || null,
      author,
      likes: [],
      shares: 0,
      savedBy: [],
      comments: []
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
}

// Update blog
async function updateBlog(req, res) {
  try {
    const { title, content, image, author } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author !== author) {
      return res.status(403).json({ message: "You cannot update this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image !== undefined ? image : blog.image;

    const updatedBlog = await blog.save();
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
}

// Delete blog
async function deleteBlog(req, res) {
  try {
    const { author } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author !== author) {
      return res.status(403).json({ message: "You cannot delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
}

// Like/unlike blog
async function toggleLikeBlog(req, res) {
  try {
    const { userEmail } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const likeIndex = blog.likes.indexOf(userEmail);
    if (likeIndex > -1) {
      blog.likes.splice(likeIndex, 1);
    } else {
      blog.likes.push(userEmail);
    }

    const updatedBlog = await blog.save();
    res.json({ message: "Like toggled", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error toggling like", error: error.message });
  }
}

// Save/unsave blog
async function toggleSaveBlog(req, res) {
  try {
    const { userEmail } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const saveIndex = blog.savedBy.indexOf(userEmail);
    if (saveIndex > -1) {
      blog.savedBy.splice(saveIndex, 1);
    } else {
      blog.savedBy.push(userEmail);
    }

    const updatedBlog = await blog.save();
    res.json({ message: "Save toggled", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error toggling save", error: error.message });
  }
}

// Increment shares
async function incrementShare(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.shares = (blog.shares || 0) + 1;
    const updatedBlog = await blog.save();
    res.json({ message: "Share incremented", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error incrementing share", error: error.message });
  }
}

// Add comment to blog
async function addComment(req, res) {
  try {
    const { author, message } = req.body;

    if (!message || !author) {
      return res.status(400).json({ message: "Message and author are required" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const newComment = {
      author,
      message,
      createdAt: new Date()
    };

    blog.comments.push(newComment);
    const updatedBlog = await blog.save();
    res.status(201).json({ message: "Comment added", comment: newComment, blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
}

// Delete comment from blog
async function deleteComment(req, res) {
  try {
    const { author } = req.body;
    const { blogId, commentId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author !== author) {
      return res.status(403).json({ message: "You cannot delete this comment" });
    }

    comment.deleteOne();
    const updatedBlog = await blog.save();
    res.json({ message: "Comment deleted", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
}

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  toggleSaveBlog,
  incrementShare,
  addComment,
  deleteComment
};
