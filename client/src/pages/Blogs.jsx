import React, { useState, useEffect } from "react";
import CreateBlog from "../components/CreateBlog";
import BlogCard from "../components/BlogCard";
import "../styles/blog.css";

export default function Blogs({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    console.log("Blogs page - User:", user); // Debug log
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    setShowCreateForm(false);
  };

  const handleBlogDeleted = () => {
    fetchBlogs();
  };

  return (
    <div className="blogs-page" style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        <h1 style={{ marginBottom: "2rem" }}>User Blogs</h1>

        {user ? (
          <>
            <button
              className="toggle-form-btn"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? "Cancel" : "+ Create a Blog"}
            </button>

            {showCreateForm && (
              <CreateBlog user={user} onBlogCreated={handleBlogCreated} />
            )}
          </>
        ) : (
          <p className="login-prompt">
            Please log in to create and engage with blogs.
          </p>
        )}

        <div className="blogs-list" style={{ marginTop: "2rem" }}>
          {loading ? (
            <p className="loading">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="no-blogs">
              No blogs yet. {user && "Be the first to create one!"}
            </p>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                user={user}
                onCommentAdded={fetchBlogs}
                onBlogDeleted={handleBlogDeleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
