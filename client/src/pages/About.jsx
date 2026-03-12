import React from "react";
import HeroSection from "../components/About/HeroSection";
import MissionSection from "../components/About/MissionSection";
import TeamSection from "../components/About/TeamSection";
import ValuesSection from "../components/About/ValuesSection";
import "../styles/about.css";

const About = () => {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
    </>
  );
};

export default About;
