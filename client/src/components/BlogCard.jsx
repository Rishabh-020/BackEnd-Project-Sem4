import React, { useState, useEffect } from "react";
import "../styles/blog.css";

export default function BlogCard({ blog, user, onCommentAdded, onBlogDeleted }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(blog.likes || []);
  const [saved, setSaved] = useState(blog.savedBy || []);
  const [isLiked, setIsLiked] = useState(blog.likes?.includes(user?.email));
  const [isSaved, setIsSaved] = useState(blog.savedBy?.includes(user?.email));
  const [comments, setComments] = useState(blog.comments || []);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like blogs");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blog._id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email })
      });
      const data = await response.json();
      setIsLiked(!isLiked);
      setLikes(data.blog.likes);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save blogs");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blog._id}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email })
      });
      const data = await response.json();
      setIsSaved(!isSaved);
      setSaved(data.blog.savedBy);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleShare = async () => {
    try {
      await fetch(`http://localhost:5000/api/blogs/${blog._id}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      alert("Blog shared!");
    } catch (error) {
      console.error("Error sharing blog:", error);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blog._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email, message: newComment })
      });
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment("");
      onCommentAdded?.();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await fetch(`http://localhost:5000/api/blogs/${blog._id}/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email })
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email })
      });
      onBlogDeleted?.();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-header">
        <div>
          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-author">By {blog.author}</p>
          <p className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
        {user?.email === blog.author && (
          <button className="delete-btn" onClick={handleDeleteBlog}>
            ✕
          </button>
        )}
      </div>

      {blog.image && (
        <img src={blog.image} alt={blog.title} className="blog-image" />
      )}

      <p className="blog-content">{blog.content}</p>

      <div className="blog-actions">
        <button 
          className={`action-btn ${isLiked ? "active" : ""}`}
          onClick={handleLike}
        >
          ❤️ {likes.length}
        </button>
        <button 
          className={`action-btn ${isSaved ? "active" : ""}`}
          onClick={handleSave}
        >
          🔖 {saved.length}
        </button>
        <button className="action-btn" onClick={handleShare}>
          📤 {blog.shares || 0}
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {comments.length}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <h4>Comments</h4>
          
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {user?.email === comment.author && (
                      <button
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="comment-message">{comment.message}</p>
                </div>
              ))
            )}
          </div>

          {user && (
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="2"
              />
              <button onClick={handleAddComment} className="submit-comment-btn">
                Post Comment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
