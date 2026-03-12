import React from "react";
import FeaturedVlogs from "../components/Home/FeaturedVlogs";

export default function Vlogs() {
  return (
    <div style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        <h2 style={{ marginBottom: "1.5rem" }}>All Vlogs</h2>
        <FeaturedVlogs />
      </div>
    </div>
  );
}
