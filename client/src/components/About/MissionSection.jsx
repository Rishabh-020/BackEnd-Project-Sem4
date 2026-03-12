import React from "react";

function MissionSection() {
    return (
      <section className="about-mission">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-subtitle">
            We're on a mission to inspire people to explore our beautiful planet
            responsibly and authentically. Through our stories, photos, and
            videos, we aim to bring the world closer together and show that
            there's more that unites us than divides us.
          </p>

          <div className="stats">
            <div className="stat" data-target="65">
              <h3 className="counter">65</h3>
              <p>Countries Visited</p>
            </div>
            <div className="stat" data-target="500">
              <h3 className="counter">500</h3>
              <p>Blog Posts</p>
            </div>
            <div className="stat" data-target="1000000">
              <h3 className="counter">10,00,000</h3>
              <p>Readers Yearly</p>
            </div>
          </div>
        </div>
      </section>
    );
}


export default MissionSection;
