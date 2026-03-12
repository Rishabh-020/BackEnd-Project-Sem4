import React from "react";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h2>Explore the World Through Our Eyes</h2>
        <p>
          Discover hidden gems, travel tips, and breathtaking destinations from
          around the globe
        </p>
        <a href="#featured-vlogs" className="cta-button">
          Start Exploring
        </a>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
}

export default Hero;