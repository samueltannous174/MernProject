

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import ShowCalender from "./components/Calender/ShowCalender";
import LearningAnalyticsDashboard from "./components/Charts/LearningAnalyticsDashboard";
import TopicsSection from "./components/Lists/TopicCards";
import VideosSection from "./components/Lists/VideoCards";
import VideoPlayer from "./components/Lists/VideoPage";




export default function App() {
  const [user, setUser] = useState(null);

  const videos = [
    {
      id: 1,
      title: "React Hooks Explained",
      youtubeUrl: "https://www.youtube.com/watch?v=f687hBjwFcM",
      category: "Advanced React",
    },
    {
      id: 2,
      title: "Building RESTful APIs with Express",
      youtubeUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
      category: "Express & APIs",
    },
  ];

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topics" element={<TopicsSection />} />
        <Route path="/videos" element={<VideosSection />} />
        <Route path="/watch/:id" element={<VideoPlayer videos={videos} />} />
        <Route path="/calendar" element={<ShowCalender />} />
        <Route path="/charts" element={<LearningAnalyticsDashboard />} />
      </Routes> 
    </Router>
  )
}

