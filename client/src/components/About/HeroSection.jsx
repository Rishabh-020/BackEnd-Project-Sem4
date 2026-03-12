import React from "react";
import "../../styles/about.css"; 

function HeroSection() {
    return (
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h2 className="fade-in-up">Our Journey Around the World</h2>
            <p className="fade-in-up delay-1">
              At WanderSphere, we believe that travel is not just about seeing
              new places, but about experiencing different cultures, meeting new
              people, and creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>
    );
}


export default HeroSection;
