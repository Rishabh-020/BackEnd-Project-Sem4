import React from "react";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="overlay"></div>
      <div className="container">
        <h2>What Our Travelers Say</h2>
        <p className="subtext">
          Real experiences from our amazing WanderSphere community
        </p>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt=""
            />
            <p>
              "WanderSphere helped me plan my dream trip to Bali! The vlogs were
              so inspiring and informative."
            </p>
            <h4>- Priya Sharma</h4>
          </div>
          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="" />
            <p>
              "I discovered hidden gems in Europe that I never knew about. The
              platform is simply amazing!"
            </p>
            <h4>- Arjun Mehta</h4>
          </div>
          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
            <p>
              "Beautifully designed, easy to use, and full of inspiration.
              WanderSphere makes travel fun again!"
            </p>
            <h4>- Sneha Patel</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
