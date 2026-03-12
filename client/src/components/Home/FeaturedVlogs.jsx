import React, { useState } from "react";
import vlogsData from "../../data/vlogsData";
import VlogModal from "./VlogModal";

export default function FeaturedVlogs() {
  const [active, setActive] = useState(null);

  function openModal(id) {
    setActive(id);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setActive(null);
    document.body.style.overflow = "auto";
  }

  return (
    <section id="featured-vlogs" className="featured-vlogs">
      <div className="container">
        <h2>Featured Vlogs</h2>

        <div className="vlog-grid">
          {vlogsData.map((v) => (
            <div
              key={v.id}
              className="vlog-card"
              onClick={() => openModal(v.id)}
            >
              <div
                className="vlog-image"
                style={{ backgroundImage: `url(${v.image})` }}
              />

              <h3>{v.title}</h3>
              <p>{v.shortDescription}</p>

              <button
                className="read-more"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(v.id);
                }}
              >
                Read Vlog
              </button>
            </div>
          ))}
        </div>
      </div>

      <VlogModal id={active} onClose={closeModal} />
    </section>
  );
}
