import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedVlogs from "../components/FeaturedVlogs";
import { useAuth } from "../../auth/context/AuthContext";
import "../../../styles/vlogs.css";

export default function Vlogs() {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Adventure",
    "Culture",
    "Food",
    "Nature",
    "Guides",
    "Travel",
    "Lifestyle",
    "Photography",
  ];

  return (
    <div className="vlogs-page">
      {/* Hero Section */}
      <section className="vlogs-hero">
        <div className="container">
          <h1 className="fade-in-up">Travel Vlogs</h1>
          <p className="fade-in-up delay-1">
            Explore the world through our eyes. Dive into deep stories, hidden
            gems, and unforgettable adventures.
          </p>

          {isAuthenticated && (
            <button
              className="real-submit-btn fade-in-up"
              style={{ marginTop: "2rem" }}
              onClick={() => navigate("/create-post")}
            >
              <i className="fas fa-plus"></i> Share Your Story
            </button>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <div className="vlog-filters">
        <div className="container filter-container">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="vlog-search">
            <div
              className="input-group"
              style={{
                margin: 0,
                padding: "0.5rem 1rem",
                background: "var(--pill-bg)",
                borderRadius: "50px",
              }}
            >
              <i
                className="fas fa-search"
                style={{ color: "var(--text-muted)", marginRight: "0.8rem" }}
              ></i>
              <input
                type="text"
                placeholder="Search stories..."
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "0.9rem",
                  color: "var(--text-color)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <section className="vlogs-main">
        <div className="container">
          <FeaturedVlogs category={activeCategory} />
        </div>
      </section>
    </div>
  );
}
