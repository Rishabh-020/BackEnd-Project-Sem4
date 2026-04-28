import React from "react";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Testimonials from "../components/Testimonials";
import FeaturedVlogs from "../components/FeaturedVlogs";
import "../../../styles/main.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Testimonials />
      <FeaturedVlogs showTitle={true} />
    </>
  );
}
