import React, { useState } from "react";
import postService from "../services/postService";
import ImageUpload from "../../components/ui/ImageUpload";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Adventure",
    image: "",
    shortDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await postService.createPost(formData);
      onPostCreated(); // Refresh posts
      onClose();
      setFormData({
        title: "",
        content: "",
        category: "Adventure",
        image: "",
        shortDescription: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create post. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vlog-modal-overlay"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="vlog-modal-content"
        style={{
          maxWidth: "600px",
          width: "90%",
          padding: "2.5rem",
          borderRadius: "25px",
          position: "relative",
        }}
      >
        <button
          className="close-btn"
          onClick={onClose}
          style={{ top: "1.5rem", right: "1.5rem" }}
        >
          &times;
        </button>

        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "2rem",
            color: "var(--dark)",
          }}
        >
          Share Your Adventure
        </h2>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <div className="form-item" style={{ marginBottom: 0 }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Post Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. My Trip to the Alps"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            />
          </div>

          <div
            className="form-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-item" style={{ marginBottom: 0 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                }}
              >
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food</option>
                <option value="Nature">Nature</option>
                <option value="Guides">Guides</option>
              </select>
            </div>
            <div className="form-item" style={{ marginBottom: 0 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Cover Image
              </label>
              <ImageUpload
                currentImage={formData.image}
                onUploadSuccess={(url) =>
                  setFormData({ ...formData, image: url })
                }
              />
            </div>
          </div>

          <div className="form-item" style={{ marginBottom: 0 }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Short Summary
            </label>
            <input
              type="text"
              name="shortDescription"
              placeholder="Briefly describe your story..."
              value={formData.shortDescription}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            />
          </div>

          <div className="form-item" style={{ marginBottom: 0 }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              The Story
            </label>
            <textarea
              name="content"
              placeholder="Write your full story here..."
              rows={6}
              value={formData.content}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #eee",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            className="real-submit-btn"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "1rem",
              background: "var(--primary)",
              color: "white",
              border: "none",
              padding: "1.2rem",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Publishing..." : "Publish Adventure"}
          </button>
        </form>
      </div>
    </div>
  );
}
