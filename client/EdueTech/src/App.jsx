

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import ProfilePage from "./components/Profile";
import ShowCalender from "./components/Calender/ShowCalender";
import LearningAnalyticsDashboard from "./components/Charts/LearningAnalyticsDashboard";
import TopicsSection from "./components/Lists/TopicCards";
import VideosSection from "./components/Lists/VideoCards";
import VideoPlayer from "./components/Lists/VideoPage";
import DraftEditor from "./components/Editor/DraftEditor";
import ViewTopicPage from "./components/Editor/ViewTopicPage";
import Chat from "./components/Ai/Chat";

import { UserContext } from "./context/context.jsx";

export default function App() {
  const { user } = useContext(UserContext);

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
      {/* GLOBAL LAYOUT */}
      <div className="min-h-screen flex flex-col bg-gray-900  ">

        
        <NavBar user={user} />

     
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/dashboard" element={<ProfilePage />} />
            <Route path="/topics" element={<TopicsSection />} />
            <Route path="/videos" element={<VideosSection />} />
            <Route path="/watch/:id" element={<VideoPlayer videos={videos} />} />
            <Route path="/calendar" element={<ShowCalender />} />
            <Route path="/charts" element={<LearningAnalyticsDashboard />} />
            <Route path="/editor" element={<DraftEditor />} />
            <Route path="/topics/:id" element={<ViewTopicPage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>

       
        <Footer />

      </div>
    </Router>
  );
}
