

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import ShowCalender from "./components/Calender/ShowCalender";
import LearningAnalyticsDashboard from "./components/Charts/LearningAnalyticsDashboard";
import TopicsSection from "./components/Lists/TopicCards";
import { useContext } from "react";
import { UserContext } from "./context/context.jsx";
import DraftEditor from "./components/Editor/DraftEditor";
import ViewTopicPage from "./components/Editor/ViewTopicPage";
import Chat from "./components/Ai/Chat";
import UserTopics from "./components/Ai/UserTopics";
import TopicDetails from "./components/Ai/TopicDetails";
import ProtectedRoute from "./context/ProtectedRoutes";
import GuestRoute from "./context/GuestRoute";
import AdminRoute from "./context/AdminRoutes";
import Footer from "./components/Footer.jsx";





export default function App() {


  const { user } = useContext(UserContext);


  return (
    <Router>
    <div className="min-h-screen flex flex-col bg-[linear-gradient(to_bottom,#07101d,#96cfef)]  ">
      
<NavBar user={user} />


    
      <main className="flex-grow">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<GuestRoute><AuthForm /></GuestRoute>} />
        <Route path="/topics" element={ <ProtectedRoute><TopicsSection /></ProtectedRoute>} />
        <Route path="/calendar" element={ <ProtectedRoute><ShowCalender /></ProtectedRoute>} />
        <Route path="/charts" element={<ProtectedRoute><LearningAnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/editor" element={<AdminRoute><DraftEditor /></AdminRoute>} />
        <Route path="/topics/:id" element={<ProtectedRoute><ViewTopicPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/my-topics" element={<ProtectedRoute><UserTopics /></ProtectedRoute>} />
        <Route path="/topic/:id" element={<ProtectedRoute><TopicDetails /></ProtectedRoute>} />
      </Routes> 
       </main>
       <Footer />
     
   
    
   
    </div>
    
     </Router>
      
  )
}

