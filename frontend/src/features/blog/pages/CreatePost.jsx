import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postService from "../services/postService";
import ImageUpload from "../../../components/ui/ImageUpload";
import "../../../styles/contact.css"; // Reuse some professional form styles

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Adventure",
    image: "",
<<<<<<< HEAD
    shortDescription: ""
=======
    shortDescription: "",
    location: "",
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await postService.createPost(formData);
      console.log("Creation result in Page:", result);
      navigate("/vlogs"); // Redirect to vlogs page after creation
    } catch (err) {
<<<<<<< HEAD
      setError(err.response?.data?.message || "Failed to create post. Please try again.");
=======
      setError(
        err.response?.data?.message ||
          "Failed to create post. Please try again.",
      );
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="create-post-page" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="contact-grid" style={{ gridTemplateColumns: '1fr', padding: '3rem' }}>
          <div className="form-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Share Your Journey</h2>
            <p style={{ color: 'var(--text-muted)' }}>Fill in the details below to publish your adventure to the WanderSphere community.</p>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', color: '#c53030', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #feb2b2' }}>
=======
    <div
      className="create-post-page"
      style={{
        background: "var(--bg-color)",
        minHeight: "100vh",
        padding: "120px 0 60px",
      }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <div
          className="contact-grid"
          style={{ gridTemplateColumns: "1fr", padding: "3rem" }}
        >
          <div
            className="form-header"
            style={{ marginBottom: "2.5rem", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "var(--text-color)",
              }}
            >
              Share Your Journey
            </h2>
            <p style={{ color: "var(--text-muted)" }}>
              Fill in the details below to publish your adventure to the
              WanderSphere community.
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "#fff5f5",
                color: "#c53030",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1.5rem",
                border: "1px solid #feb2b2",
              }}
            >
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label>Story Title</label>
<<<<<<< HEAD
              <input 
                type="text" 
                name="title" 
=======
              <input
                type="text"
                name="title"
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                placeholder="Give your adventure a catchy title..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

<<<<<<< HEAD
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-item">
                <label>Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-color)', color: 'var(--text-color)' }}
=======
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="form-item">
                <label>
                  <i className="fas fa-map-marker-alt"></i> Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bali, Indonesia"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-item">
                <label>
                  <i className="fas fa-align-left"></i> Short Description
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                  }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                >
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                  <option value="Food">Food</option>
                  <option value="Nature">Nature</option>
                  <option value="Guides">Guides</option>
<<<<<<< HEAD
=======
                  <option value="Wildlife">Wildlife</option>
                  <option value="Backpacking">Backpacking</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Solo Travel">Solo Travel</option>
                  <option value="Road Trips">Road Trips</option>
                  <option value="Photography">Photography</option>
                  <option value="Other">Other</option>
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                </select>
              </div>
              <div className="form-item">
                <label>Cover Image</label>
<<<<<<< HEAD
                <ImageUpload 
                  currentImage={formData.image} 
                  onUploadSuccess={(url) => setFormData({ ...formData, image: url })} 
=======
                <ImageUpload
                  currentImage={formData.image}
                  onUploadSuccess={(url) =>
                    setFormData({ ...formData, image: url })
                  }
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                />
              </div>
            </div>

            <div className="form-item">
              <label>Short Summary</label>
<<<<<<< HEAD
              <input 
                type="text" 
                name="shortDescription" 
=======
              <input
                type="text"
                name="shortDescription"
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                placeholder="A one-sentence hook for your readers..."
                value={formData.shortDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-item">
              <label>The Full Story</label>
<<<<<<< HEAD
              <textarea 
                name="content" 
                rows={10} 
=======
              <textarea
                name="content"
                rows={10}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                placeholder="Share every detail of your journey..."
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

<<<<<<< HEAD
            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="real-submit-btn" 
=======
            <div
              className="form-actions"
              style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
            >
              <button
                type="submit"
                className="real-submit-btn"
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                disabled={loading}
                style={{ flex: 2 }}
              >
                {loading ? "Publishing..." : "Publish Adventure"}
              </button>
<<<<<<< HEAD
              <button 
                type="button" 
                className="real-submit-btn" 
                onClick={() => navigate(-1)}
                style={{ flex: 1, background: 'var(--pill-bg)', color: 'var(--text-color)' }}
=======
              <button
                type="button"
                className="real-submit-btn"
                onClick={() => navigate(-1)}
                style={{
                  flex: 1,
                  background: "var(--pill-bg)",
                  color: "var(--text-color)",
                }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
