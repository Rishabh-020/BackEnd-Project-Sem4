import React from "react";
import Hero from "../components/Home/Hero";
import Intro from "../components/Home/Intro";
import Testimonials from "../components/Home/Testimonials";
import FeaturedVlogs from "../components/Home/FeaturedVlogs";
import "../styles/main.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Testimonials />
      <FeaturedVlogs />
    </>
  );
}
