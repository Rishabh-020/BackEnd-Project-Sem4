import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VlogsPage from "./pages/Vlogs";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const CURRENT_USER_KEY = "wandersphere_current_user";

const readCurrentUser = () => {
  const raw =
    localStorage.getItem(CURRENT_USER_KEY) ||
    sessionStorage.getItem(CURRENT_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export default function App() {
  const [user, setUser] = useState(() => readCurrentUser());

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vlogs" element={<VlogsPage user={user} />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
      </Routes>
      <Footer />
    </>
  );
}
