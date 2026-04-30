import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import postService from "../services/postService";
import VlogModal from "./VlogModal";

<<<<<<< HEAD
export default function FeaturedVlogs({ category = "All", showTitle = false }) {
=======
export default function FeaturedVlogs({
  category = "All",
  searchQuery = "",
  showTitle = false,
}) {
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setVlogs(response.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

<<<<<<< HEAD
  const filteredVlogs =
    category === "All" ? vlogs : vlogs.filter((v) => v.category === category);
=======
  const filteredVlogs = vlogs.filter((v) => {
    const matchesCategory = category === "All" || v.category === category;
    const matchesSearch =
      v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa

  function openModal(id) {
    if (!user) {
      navigate("/login");
      return;
    }
    setActive(id);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setActive(null);
    document.body.style.overflow = "auto";
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "5rem 0" }}>
        <div
          className="spinner"
          style={{
            margin: "0 auto 1.5rem",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid var(--primary)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p style={{ color: "var(--gray)" }}>Discovering stories...</p>
      </div>
    );

  return (
    <section className="featured-vlogs-section">
      <div className="vlog-grid-premium">
        {filteredVlogs.length > 0 ? (
          filteredVlogs.map((v) => (
            <div
              key={v._id || v.id}
              className="vlog-card-premium fade-in-up"
              onClick={() => openModal((v._id || v.id).toString())}
            >
              <div className="vlog-card-image">
                <div className="vlog-badge">{v.category || "Travel"}</div>
                <img
                  src={
                    v.image ||
                    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80"
                  }
                  alt={v.title}
                />
              </div>

              <div className="vlog-content">
                <div className="vlog-date">
<<<<<<< HEAD
                  <i className="far fa-calendar-alt"></i>
=======
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {v.location || "Global"}
                  <span style={{ margin: "0 0.5rem" }}>•</span>
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                  <span>
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleDateString()
                      : "May 12, 2024"}
                  </span>
<<<<<<< HEAD
                  <span style={{ margin: "0 0.5rem" }}>•</span>
                  <span>5 min read</span>
=======
>>>>>>> fee9ed306db09568d08e3253ddae79d78b4028aa
                </div>

                <h3>{v.title}</h3>
                <p>
                  {v.shortDescription || v.content?.substring(0, 100) + "..."}
                </p>

                <div className="vlog-footer">
                  <div className="author-info">
                    <div className="author-avatar-small">
                      {v.author?.profilePicture ? (
                        <img
                          src={v.author.profilePicture}
                          alt={v.author.username}
                        />
                      ) : (
                        <i className="fas fa-user-circle"></i>
                      )}
                    </div>
                    <span className="author-name">
                      By {v.author?.username || "Adventurer"}
                    </span>
                  </div>
                  <div className="read-btn">
                    <span>Explore Story</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              gridColumn: "1 / -1",
            }}
          >
            <i
              className="fas fa-search-minus"
              style={{ fontSize: "3rem", color: "#eee", marginBottom: "1rem" }}
            ></i>
            <p style={{ color: "#adb5bd" }}>
              No stories found in this category yet. Stay tuned!
            </p>
          </div>
        )}
      </div>
      <VlogModal id={active} onClose={closeModal} />
    </section>
  );
}
