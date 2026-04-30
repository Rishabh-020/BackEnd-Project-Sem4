import React, { useEffect, useState } from "react";
import postService from "../services/postService";

export default function VlogModal({ id, onClose, showExplore = true }) {
  const [vlog, setVlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await postService.getPost(id);
        const postData = response.data || response;
        setVlog(postData);
      } catch (err) {
        console.error("Error fetching post details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => document.removeEventListener("keydown", onKey);
  }, [id, onClose]);

  if (!id) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div
        className="modal-content"
        style={{
          maxWidth: "800px",
          margin: "3vh auto",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <span className="close-modal" onClick={onClose} style={{ zIndex: 10 }}>
          &times;
        </span>
        <div
          className="modal-body"
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE/Edge */,
          }}
        >
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style>{`
            .modal-body::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Top: Image Section */}
          <div
            style={{
              width: "100%",
              height: "400px",
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={
                vlog?.image ||
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1350&q=80"
              }
              alt={vlog?.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Bottom: Content Section */}
          <div
            style={{
              padding: "2.5rem",
              background: "var(--card-bg)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  color: "var(--text-muted)",
                }}
              >
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ fontSize: "2rem", marginBottom: "1rem" }}
                ></i>
                <p>Opening adventure...</p>
              </div>
            ) : vlog ? (
              <>
                <div
                  style={{
                    marginBottom: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="vlog-badge" style={{ position: "static" }}>
                    {vlog.category}
                  </span>
                  <div
                    className="vlog-meta"
                    style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div className="vlog-meta-item">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {vlog.location || "Global"}
                    </div>
                    <div className="vlog-meta-item">
                      <i className="far fa-calendar-alt"></i>{" "}
                      {new Date(vlog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.2",
                    color: "var(--text-color)",
                    fontWeight: "800",
                  }}
                >
                  {vlog.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "2rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background: "var(--pill-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <span
                      style={{
                        fontWeight: "700",
                        color: "var(--text-color)",
                        display: "block",
                      }}
                    >
                      {vlog.author?.username || "Wanderer"}
                    </span>
                    <span
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                    >
                      Adventurer
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    color: "var(--text-color)",
                    opacity: 0.95,
                    lineHeight: "1.8",
                    fontSize: "1.1rem",
                    whiteSpace: "pre-line",
                  }}
                >
                  {vlog.content}
                </div>

                {showExplore && (
                  <div
                    style={{
                      marginTop: "3rem",
                      padding: "2rem",
                      background: "var(--pill-bg)",
                      borderRadius: "20px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: "0.5rem",
                        color: "var(--text-color)",
                      }}
                    >
                      Loved this story?
                    </h4>
                    <p
                      style={{
                        marginBottom: "1.5rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Explore more incredible adventures from our global
                      community.
                    </p>
                    <button
                      className="read-more"
                      onClick={onClose}
                      style={{ margin: 0, padding: "0.8rem 2rem" }}
                    >
                      Keep Exploring
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  padding: "5rem",
                  textAlign: "center",
                  color: "var(--text-muted)",
                }}
              >
                <i
                  className="fas fa-exclamation-circle"
                  style={{
                    fontSize: "2rem",
                    color: "#ccc",
                    marginBottom: "1rem",
                  }}
                ></i>
                <p>We couldn't find that story.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
