import React, { useState } from "react";
import "../styles/blog.css";

export default function CreateBlog({ user, onBlogCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    if (!user) {
      setError("Please login to create a blog");
      return;
    }

    setLoading(true);

    try {
      // If image file exists, upload it as base64
      let imageData = imagePreview || null;

      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image: imageData,
          author: user.email
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const data = await response.json();
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      onBlogCreated?.(data.blog);
      alert("Blog created successfully!");
    } catch (err) {
      setError(err.message || "Error creating blog");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog">
      <h2>Create a New Blog</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview("");
                }}
                className="remove-image-btn"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            rows="8"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
