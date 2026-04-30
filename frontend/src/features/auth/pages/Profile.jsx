import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import postService from "../../blog/services/postService";
import VlogModal from "../../blog/components/VlogModal";
import "../../../styles/profile.css";

const Profile = () => {
  const { user, initiateLogout, updateProfile, triggerToast } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  
  // View Post State
  const [selectedPostId, setSelectedPostId] = useState(null);
  
=======

  // View Post State
  const [selectedPostId, setSelectedPostId] = useState(null);

>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.username || "");
  const [isSaving, setIsSaving] = useState(false);
<<<<<<< HEAD
  
  // Edit Post State
  const [editingPost, setEditingPost] = useState(null);
  const [editPostData, setEditPostData] = useState({ title: "", category: "Adventure", image: "", shortDescription: "", content: "" });
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  
  const navigate = useNavigate();
  
=======

  // Edit Post State
  const [editingPost, setEditingPost] = useState(null);
  const [editPostData, setEditPostData] = useState({
    title: "",
    category: "Adventure",
    image: "",
    shortDescription: "",
    content: "",
    location: "",
  });
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);

  // Delete Confirmation State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const navigate = useNavigate();

>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState(user?.profilePicture || null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await postService.getMyPosts();
        // Extract the array from response.data (since getMyPosts returns response.data which is {success, data: []})
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

<<<<<<< HEAD
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this adventure story?")) {
      try {
        await postService.deletePost(postId);
        // Refresh the list
        setPosts(posts.filter(p => p._id !== postId));
        if (triggerToast) triggerToast("Post deleted successfully", "success");
      } catch (err) {
        if (triggerToast) triggerToast("Failed to delete post. Please try again.", "error");
      }
=======
  const handleDeleteClick = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostIdToDelete(null);
  };

  const confirmDelete = async () => {
    if (!postIdToDelete) return;
    try {
      await postService.deletePost(postIdToDelete);
      // Refresh the list
      setPosts(posts.filter((p) => p._id !== postIdToDelete));
      if (triggerToast) triggerToast("Post deleted successfully", "success");
    } catch (err) {
      if (triggerToast)
        triggerToast("Failed to delete post. Please try again.", "error");
    } finally {
      setShowDeleteModal(false);
      setPostIdToDelete(null);
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
    }
  };

  const openEditPost = (post) => {
    setEditingPost(post);
    setEditPostData({
      title: post.title || "",
      category: post.category || "Adventure",
      image: post.image || "",
      shortDescription: post.shortDescription || "",
<<<<<<< HEAD
      content: post.content || ""
=======
      content: post.content || "",
      location: post.location || "",
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
    });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsUpdatingPost(true);
    try {
<<<<<<< HEAD
      const response = await postService.updatePost(editingPost._id, editPostData);
      if (response.success) {
        // Update local state
        setPosts(posts.map(p => p._id === editingPost._id ? response.data : p));
=======
      const response = await postService.updatePost(
        editingPost._id,
        editPostData,
      );
      if (response.success) {
        // Update local state
        setPosts(
          posts.map((p) => (p._id === editingPost._id ? response.data : p)),
        );
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
        setEditingPost(null);
        if (triggerToast) triggerToast("Post updated successfully!", "success");
      }
    } catch (err) {
<<<<<<< HEAD
      if (triggerToast) triggerToast(err.response?.data?.message || "Failed to update post.", "error");
=======
      if (triggerToast)
        triggerToast(
          err.response?.data?.message || "Failed to update post.",
          "error",
        );
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // prevent triggering the file input
    setProfileImg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) return;
    setIsSaving(true);
    try {
      const response = await updateProfile({ username: editName });
      if (response.success) {
        setIsEditing(false);
      } else {
        alert("Failed to update profile: " + response.message);
      }
    } catch (err) {
      alert("An error occurred while updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

<<<<<<< HEAD
  if (!user) return <div className="container">Please login to view profile.</div>;
=======
  if (!user)
    return <div className="container">Please login to view profile.</div>;
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa

  return (
    <div className="profile-page container">
      <section className="profile-header">
        <div className="profile-info-card">
<<<<<<< HEAD
          <div 
            className="profile-avatar" 
            style={{ 
              position: 'relative', 
              cursor: 'pointer', 
              width: '150px', 
              height: '150px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }} 
            onClick={handleImageClick} 
            title="Change Profile Picture"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
=======
          <div
            className="profile-avatar"
            style={{
              position: "relative",
              cursor: "pointer",
              width: "150px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            onClick={handleImageClick}
            title="Change Profile Picture"
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
              accept="image/*"
              onChange={handleFileChange}
            />
            {profileImg ? (
              <>
<<<<<<< HEAD
                <img src={profileImg} alt={user.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }} />
                <button 
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    boxShadow: 'var(--shadow)',
                    zIndex: 2
=======
                <img
                  src={profileImg}
                  alt={user.username}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid var(--primary)",
                  }}
                />
                <button
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    boxShadow: "var(--shadow)",
                    zIndex: 2,
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                  }}
                  title="Remove Image"
                >
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : (
              <>
<<<<<<< HEAD
                <i className="fas fa-user-circle" style={{ fontSize: '150px', color: 'var(--primary)', lineHeight: 1 }}></i>
                <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    boxShadow: 'var(--shadow)',
                    zIndex: 2
                  }}>
=======
                <i
                  className="fas fa-user-circle"
                  style={{
                    fontSize: "150px",
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                ></i>
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    background: "var(--primary)",
                    color: "white",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    boxShadow: "var(--shadow)",
                    zIndex: 2,
                  }}
                >
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                  <i className="fas fa-camera"></i>
                </div>
              </>
            )}
          </div>
<<<<<<< HEAD
          <div className="profile-details" style={{ textAlign: 'left', width: '100%' }}>
            <h2 style={{ textAlign: 'left', margin: '0 0 0.5rem 0' }}>{user.username}</h2>
            <p className="email" style={{ justifyContent: 'flex-start', margin: '0 0 1.5rem 0' }}><i className="fas fa-envelope"></i> {user.email}</p>
            <p className="stats" style={{ justifyContent: 'flex-start', margin: '0 0 2rem 0' }}>
              <span><strong>{posts.length}</strong> Posts</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button className="logout-btn-profile" style={{ margin: 0 }} onClick={initiateLogout}>Logout</button>
=======
          <div
            className="profile-details"
            style={{ textAlign: "left", width: "100%" }}
          >
            <h2 style={{ textAlign: "left", margin: "0 0 0.5rem 0" }}>
              {user.username}
            </h2>
            <p
              className="email"
              style={{ justifyContent: "flex-start", margin: "0 0 1.5rem 0" }}
            >
              <i className="fas fa-envelope"></i> {user.email}
            </p>
            <p
              className="stats"
              style={{ justifyContent: "flex-start", margin: "0 0 2rem 0" }}
            >
              <span>
                <strong>{posts.length}</strong> Posts
              </span>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <button
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="logout-btn-profile"
                style={{ margin: 0 }}
                onClick={initiateLogout}
              >
                Logout
              </button>
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
            </div>
          </div>
        </div>
      </section>

      {isEditing && (
<<<<<<< HEAD
        <div className="modal" style={{ display: 'block', zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <div className="modal-content" style={{ maxWidth: '400px', margin: '15vh auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
            <button onClick={() => setIsEditing(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-color)' }}>&times;</button>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Edit Profile</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>Username</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
              />
            </div>

            <button 
              onClick={handleSaveProfile} 
              disabled={isSaving}
              style={{ width: '100%', padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer' }}
=======
        <div
          className="modal"
          style={{
            display: "block",
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: "400px",
              margin: "15vh auto",
              background: "var(--card-bg)",
              padding: "2rem",
              borderRadius: "20px",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsEditing(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--text-color)",
              }}
            >
              &times;
            </button>
            <h3 style={{ marginBottom: "1.5rem", color: "var(--text-color)" }}>
              Edit Profile
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--text-color)",
                  fontWeight: "600",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                }}
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
<<<<<<< HEAD
        <div className="modal" style={{ display: 'block', zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflowY: 'auto' }}>
          <div className="modal-content" style={{ maxWidth: '600px', margin: '5vh auto', background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
            <button onClick={() => setEditingPost(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-color)' }}>&times;</button>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-color)', fontSize: '1.8rem' }}>Edit Adventure</h3>
            
            <form onSubmit={handleUpdatePost}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>Story Title</label>
                <input 
                  type="text" 
                  value={editPostData.title}
                  onChange={(e) => setEditPostData({...editPostData, title: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>Category</label>
                  <select 
                    value={editPostData.category}
                    onChange={(e) => setEditPostData({...editPostData, category: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
=======
        <div
          className="modal"
          style={{
            display: "block",
            zIndex: 3000,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: "700px",
              margin: "40px auto",
              background: "var(--card-bg)",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              position: "relative",
              border: "1px solid var(--border-color)",
              animation: "slideUp 0.4s ease-out",
            }}
          >
            <button
              onClick={() => setEditingPost(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "var(--pill-bg)",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: "var(--text-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &times;
            </button>

            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  color: "var(--text-color)",
                  fontSize: "2rem",
                  fontWeight: "800",
                  marginBottom: "10px",
                }}
              >
                Edit Adventure
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                Update your story details and keep your wanderers engaged.
              </p>
            </div>

            <form onSubmit={handleUpdatePost}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                    color: "var(--text-color)",
                    fontWeight: "600",
                  }}
                >
                  <i
                    className="fas fa-heading"
                    style={{ color: "var(--primary)" }}
                  ></i>{" "}
                  Story Title
                </label>
                <input
                  type="text"
                  value={editPostData.title}
                  onChange={(e) =>
                    setEditPostData({ ...editPostData, title: e.target.value })
                  }
                  required
                  placeholder="Give your story a catchy title"
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    borderRadius: "15px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      color: "var(--text-color)",
                      fontWeight: "600",
                    }}
                  >
                    <i
                      className="fas fa-tags"
                      style={{ color: "var(--primary)" }}
                    ></i>{" "}
                    Category
                  </label>
                  <select
                    value={editPostData.category}
                    onChange={(e) =>
                      setEditPostData({
                        ...editPostData,
                        category: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      borderRadius: "15px",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-color)",
                      color: "var(--text-color)",
                      fontSize: "1rem",
                      appearance: "none",
                    }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Food">Food</option>
                    <option value="Nature">Nature</option>
                    <option value="Guides">Guides</option>
<<<<<<< HEAD
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>Cover Image URL</label>
                  <input 
                    type="text" 
                    value={editPostData.image}
                    onChange={(e) => setEditPostData({...editPostData, image: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
=======
                    <option value="Wildlife">Wildlife</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Solo Travel">Solo Travel</option>
                    <option value="Road Trips">Road Trips</option>
                    <option value="Photography">Photography</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      color: "var(--text-color)",
                      fontWeight: "600",
                    }}
                  >
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "var(--primary)" }}
                    ></i>{" "}
                    Location
                  </label>
                  <input
                    type="text"
                    value={editPostData.location}
                    onChange={(e) =>
                      setEditPostData({
                        ...editPostData,
                        location: e.target.value,
                      })
                    }
                    required
                    placeholder="e.g. Kyoto, Japan"
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      borderRadius: "15px",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-color)",
                      color: "var(--text-color)",
                      fontSize: "1rem",
                    }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                  />
                </div>
              </div>

<<<<<<< HEAD
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>Short Summary</label>
                <input 
                  type="text" 
                  value={editPostData.shortDescription}
                  onChange={(e) => setEditPostData({...editPostData, shortDescription: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '600' }}>The Full Story</label>
                <textarea 
                  rows="6"
                  value={editPostData.content}
                  onChange={(e) => setEditPostData({...editPostData, content: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setEditingPost(null)} 
                  style={{ flex: 1, padding: '0.8rem', background: 'var(--pill-bg)', color: 'var(--text-color)', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUpdatingPost}
                  style={{ flex: 2, padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: isUpdatingPost ? 'not-allowed' : 'pointer' }}
                >
                  {isUpdatingPost ? "Saving..." : "Save Changes"}
=======
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                    color: "var(--text-color)",
                    fontWeight: "600",
                  }}
                >
                  <i
                    className="fas fa-quote-left"
                    style={{ color: "var(--primary)" }}
                  ></i>{" "}
                  Short Summary
                </label>
                <input
                  type="text"
                  value={editPostData.shortDescription}
                  onChange={(e) =>
                    setEditPostData({
                      ...editPostData,
                      shortDescription: e.target.value,
                    })
                  }
                  required
                  placeholder="A brief teaser of your adventure"
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    borderRadius: "15px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                    color: "var(--text-color)",
                    fontWeight: "600",
                  }}
                >
                  <i
                    className="fas fa-feather-alt"
                    style={{ color: "var(--primary)" }}
                  ></i>{" "}
                  The Full Story
                </label>
                <textarea
                  rows="8"
                  value={editPostData.content}
                  onChange={(e) =>
                    setEditPostData({
                      ...editPostData,
                      content: e.target.value,
                    })
                  }
                  required
                  placeholder="Share every detail of your journey..."
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    borderRadius: "15px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "var(--pill-bg)",
                    color: "var(--text-color)",
                    border: "none",
                    borderRadius: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPost}
                  style={{
                    flex: 2,
                    padding: "16px",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    fontWeight: "700",
                    cursor: isUpdatingPost ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isUpdatingPost ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    "Update Adventure"
                  )}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="user-posts">
        <div className="section-header">
          <h3>Your Adventure Stories</h3>
<<<<<<< HEAD
          <button className="create-post-btn" onClick={() => navigate("/create-post")}>
=======
          <button
            className="create-post-btn"
            onClick={() => navigate("/create-post")}
          >
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
            <i className="fas fa-plus"></i> Create New Post
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading your stories...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
<<<<<<< HEAD
                <div 
                  className="post-image" 
                  onClick={() => setSelectedPostId(post._id)}
                  style={{ backgroundImage: `url(${post.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80'})`, cursor: 'pointer' }}
=======
                <div
                  className="post-image"
                  onClick={() => setSelectedPostId(post._id)}
                  style={{
                    backgroundImage: `url(${post.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80"})`,
                    cursor: "pointer",
                  }}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                >
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-content">
<<<<<<< HEAD
                  <h4 
                    onClick={() => setSelectedPostId(post._id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    {post.title}
                  </h4>
                  <p>{post.content ? post.content.substring(0, 100) : post.shortDescription}...</p>
                  <div className="post-footer">
                    <span className="post-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className="post-actions">
                      <button title="Edit" onClick={() => openEditPost(post)}><i className="fas fa-edit"></i></button>
                      <button 
                        title="Delete" 
                        className="delete-btn"
                        onClick={() => handleDelete(post._id)}
=======
                  <h4
                    onClick={() => setSelectedPostId(post._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </h4>
                  <p>
                    {post.content
                      ? post.content.substring(0, 100)
                      : post.shortDescription}
                    ...
                  </p>
                  <div className="post-footer">
                    <span className="post-date">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {post.location || "Global"} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className="post-actions">
                      <button title="Edit" onClick={() => openEditPost(post)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        title="Delete"
                        className="delete-btn"
                        onClick={() => handleDeleteClick(post._id)}
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-feather-alt"></i>
            <p>You haven't shared any adventures yet.</p>
<<<<<<< HEAD
            <button className="cta-button" onClick={() => navigate("/create-post")}>Share Your First Story</button>
=======
            <button
              className="cta-button"
              onClick={() => navigate("/create-post")}
            >
              Share Your First Story
            </button>
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
          </div>
        )}
      </section>

      {/* View Post Modal */}
      {selectedPostId && (
<<<<<<< HEAD
        <VlogModal id={selectedPostId} onClose={() => setSelectedPostId(null)} />
=======
        <VlogModal
          id={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          showExplore={false}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <div
              style={{
                color: "#ef4444",
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3>Delete Story</h3>
            <p>
              Are you sure you want to delete this adventure? This action cannot
              be undone.
            </p>
            <div className="confirm-modal-actions">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
      )}
    </div>
  );
};

export default Profile;
