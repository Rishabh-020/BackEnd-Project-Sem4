import React from "react";

function ValuesSection() {
    return (
      <section className="about-values">
        <div className="container">
          <h2 className="section-title-1">Our Values</h2>

          <div className="values-grid">
            <div className="value fade-in-up">
              <i className="fas fa-globe-americas"></i>
              <h3>Sustainable Travel</h3>
              <p>
                We promote responsible tourism that respects local communities
                and environments.
              </p>
            </div>

            <div className="value fade-in-up delay-1">
              <i className="fas fa-heart"></i>
              <h3>Authentic Experiences</h3>
              <p>
                We seek out genuine cultural exchanges and off-the-beaten-path
                adventures.
              </p>
            </div>

            <div className="value fade-in-up delay-2">
              <i className="fas fa-users"></i>
              <h3>Community Building</h3>
              <p>
                We believe in connecting travelers from around the world to
                share stories and tips.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}


export default ValuesSection;
