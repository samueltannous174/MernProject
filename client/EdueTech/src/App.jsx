import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TopicsSection from './components/Lists/TopicCards'
import VideosSection from './components/Lists/VideoCards'
import VideoPlayer from './components/Lists/VideoPage'
import ShowCalender from './components/Calender/ShowCalender'

function App() {

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="text-3xl font-bold underline">Home</div>} />
        <Route path="/topics" element={<TopicsSection />} />
        <Route path="/videos" element={<VideosSection />} />
        <Route path="/watch/:id" element={<VideoPlayer videos={videos} />} />
        <Route path="/calendar" element={<ShowCalender />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
