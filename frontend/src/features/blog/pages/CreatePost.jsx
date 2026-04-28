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
    shortDescription: ""
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
      setError(err.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="contact-grid" style={{ gridTemplateColumns: '1fr', padding: '3rem' }}>
          <div className="form-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Share Your Journey</h2>
            <p style={{ color: 'var(--text-muted)' }}>Fill in the details below to publish your adventure to the WanderSphere community.</p>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', color: '#c53030', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #feb2b2' }}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label>Story Title</label>
              <input 
                type="text" 
                name="title" 
                placeholder="Give your adventure a catchy title..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-item">
                <label>Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                >
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                  <option value="Food">Food</option>
                  <option value="Nature">Nature</option>
                  <option value="Guides">Guides</option>
                </select>
              </div>
              <div className="form-item">
                <label>Cover Image</label>
                <ImageUpload 
                  currentImage={formData.image} 
                  onUploadSuccess={(url) => setFormData({ ...formData, image: url })} 
                />
              </div>
            </div>

            <div className="form-item">
              <label>Short Summary</label>
              <input 
                type="text" 
                name="shortDescription" 
                placeholder="A one-sentence hook for your readers..."
                value={formData.shortDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-item">
              <label>The Full Story</label>
              <textarea 
                name="content" 
                rows={10} 
                placeholder="Share every detail of your journey..."
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="real-submit-btn" 
                disabled={loading}
                style={{ flex: 2 }}
              >
                {loading ? "Publishing..." : "Publish Adventure"}
              </button>
              <button 
                type="button" 
                className="real-submit-btn" 
                onClick={() => navigate(-1)}
                style={{ flex: 1, background: 'var(--pill-bg)', color: 'var(--text-color)' }}
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
