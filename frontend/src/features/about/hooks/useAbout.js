import { useState, useEffect } from "react";

// Hook for About page data
// Replace the static data below with real API calls when backend is ready
// e.g. const res = await fetch("/api/about/team");
export function useAbout() {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Kaustav Bhardwaj",
      role: "Team Leader",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      description:
        "I am the team leader, working alongside my amazing team to create and share our travel stories with the world.",
    },
    {
      id: 2,
      name: "Kunal Sharma",
      role: "Content Creator",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      description:
        "Working alongside my amazing team to bring exciting travel stories and experiences to life.",
    },
    {
      id: 3,
      name: "Krishna Sharma",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      description:
        "I am the storyteller behind the lens, capturing memories and turning them into unforgettable visuals.",
    },
    {
      id: 4,
      name: "Krish",
      role: "Writer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      description:
        "I bring our adventures to words, crafting blogs that let you feel the journey as if you were right there with us.",
    },
  ]);

  const [stats] = useState([
    { label: "Countries Visited", value: "65" },
    { label: "Blog Posts", value: "500" },
    { label: "Readers Yearly", value: "10,00,000" },
  ]);

  return { teamMembers, stats };
}
