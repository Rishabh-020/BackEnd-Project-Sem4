import React from "react";
function TeamSection() {
  return (
    <section className="about-team">
      <div className="container">
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-subtitle team-intro">
          We're a group of passionate travelers who turned our hobby into our
          profession.
        </p>

        <div className="team-grid">
          <div className="team-member slide-up">
            <div className="member-image">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                alt="Kaustav"
              />
            </div>
            <h3>Kaustav Bhardwaj</h3>
            <p className="role">Team Leader</p>
            <p className="description">
              I am the team leader, working alongside my amazing team to create
              and share our travel stories with the world.
            </p>
          </div>

          <div className="team-member slide-up">
            <div className="member-image">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Member 2"
              />
            </div>
            <h3>Kunal Sharma</h3>
            <p className="role">Content Creator</p>
            <p className="description">
              I am the team leader, working alongside my amazing team to bring
              exciting travel stories and experiences to life.
            </p>
          </div>

          <div className="team-member slide-up">
            <div className="member-image">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                alt="Member 3"
              />
            </div>
            <h3>Krishna Sharma</h3>
            <p className="role">Photographer</p>
            <p className="description">
              I am the storyteller behind the lens, capturing memories and
              turning them into unforgettable visuals.
            </p>
          </div>

          <div className="team-member slide-up">
            <div className="member-image">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Member 4"
              />
            </div>
            <h3>Krish</h3>
            <p className="role">Writer</p>
            <p className="description">
              I bring our adventures to words, crafting blogs that let you feel
              the journey as if you were right there with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

