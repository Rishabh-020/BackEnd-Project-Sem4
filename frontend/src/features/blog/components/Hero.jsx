import React from "react";

export default function Hero() {
  const bgRef = React.useRef(null);

  React.useEffect(() => {
    let requestRef;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;

    const animate = () => {
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) > 0.05) {
        currentScroll += diff * 0.08; // Slightly slower for more "weight"

        if (bgRef.current) {
          // Remove Math.round for sub-pixel smoothness (fixes the "shaking" on high-res screens)
          bgRef.current.style.transform = `translate3d(0, ${currentScroll * -0.15}px, 0)`;
        }
      }
      requestRef = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  function handleCTAClick(e) {
    e.preventDefault();
    const el = document.querySelector("#featured-vlogs");
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-content">
        <h2>Explore the World Through Our Eyes</h2>
        <p>
          Discover hidden gems, travel tips, and breathtaking destinations from
          around the globe
        </p>
        <a
          href="#featured-vlogs"
          className="cta-button"
          onClick={handleCTAClick}
        >
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
