import React from "react";

export default function Toast({ type, message }) {
  if (!message) return null; // ⬅ prevents empty popup

  return <div className={`toast ${type}`}>{message}</div>;
}
