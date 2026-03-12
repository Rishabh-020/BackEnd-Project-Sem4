import React, { useEffect } from "react";
import vlogsData from "../../data/vlogsData";

export default function VlogModel({ id, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!id) return null;

  const vlog = vlogsData.find((v) => v.id === id);
  if (!vlog) return null;

  return (
    <div className="modal" onClick={onClose} style={{ display: "block" }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <div className="modal-body">
          <div
            className="modal-image"
            style={{ backgroundImage: `url(${vlog.image})` }}
          />
          <div className="modal-text">
            <h3 id="modal-title">{vlog.title}</h3>
            <p id="modal-description">{vlog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
