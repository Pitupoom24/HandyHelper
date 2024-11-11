import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App";
import Homepage from "./pages/Homepage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Post from "./pages/Post.jsx";
import Browse from "./pages/Browse.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostedJob from './components/PostedJob.jsx';
import Profile from './pages/Profile';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/post" element={<Post />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posted-jobs" element={<PostedJob />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </App>
    </Router>
  </StrictMode>
);
