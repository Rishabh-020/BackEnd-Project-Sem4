import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./features/blog/pages/Home";
import Vlogs from "./features/blog/pages/Vlogs";
import About from "./features/about/pages/About";
import Contact from "./features/contact/pages/Contact";
import Login from "./features/auth/pages/Login";
import Profile from "./features/auth/pages/Profile";
import CreatePost from "./features/blog/pages/CreatePost";
import "./styles/main.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout() {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Header user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vlogs"
            element={
              <ProtectedRoute>
                <Vlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
