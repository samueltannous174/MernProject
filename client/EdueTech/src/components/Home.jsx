
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroGif from "../assets/hero.gif";
import CSS from "../assets/a1.gif";
import JS from "../assets/JS.gif";
import Python from "../assets/python.gif";
import React from "../assets/reactjs.gif";
import HTML from "../assets/HTML.gif";
import ReactBig from "../assets/REACTB.gif";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800 scroll-smooth">
      <div className="relative w-full h-screen">
        <img
          src={HeroGif}
          alt="Learning Platform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-start pl-16 text-left text-white">
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl font-bold">
              Start Your <br /> Coding Adventure 
            </h1>
            <p className="text-xl md:text-2xl">
              Beginner friendly coding courses and projects 
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-300 hover:bg-blue-700 transition"
            >
              GET STARTED 
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 fade-on-scroll">
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  
  <img
    src={HTML}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />
  

  <p className="text-lg">
    HTML BEGINNER
  </p>
</div>
<div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  {/* <iframe
    className="w-full h-48 rounded-xl shadow-lg"
    src="https://www.youtube.com/embed/VIDEO_ID_2"
    title="Purpose Video"
    allowFullScreen
  /> */}
  <img
    src={CSS}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />

  <p className="text-lg">
    CSS BEGINNER
  </p>
</div>
<div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  
  <img
    src={JS}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />

  <p className="text-lg">
    JAVASCRIPT BEGINNER
  </p>
</div>
<div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  
  <img
    src={ReactBig}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />

  <p className="text-lg">
    REACT BEGINNER
  </p>
</div>
<div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  
  <img
    src={Python}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />

  <p className="text-lg">
    PYTHON BEGINNER
  </p>
</div>
<div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
 

  
  <img
    src={React}
    onClick={() => navigate("/auth")}
    alt="Login to watch video"
    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
  />

  <p className="text-lg">
    REACT ADVANCE
  </p>
</div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
            
            <div className="text-6xl">✨</div>
            <h2 className="text-2xl font-bold">Features</h2>
            <ul className="space-y-2 text-lg">
              <li> Beginner-friendly tutorials</li>
              <li> Project-based learning</li>
              <li> Community support</li>
              <li> Quizzes & challenges</li>
            </ul>
          </div>

          

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
            
            <div className="text-6xl">🌟</div>
            <h2 className="text-2xl font-bold">Purpose</h2>
            <p className="text-lg">
              Make coding accessible, fun, and practical for everyone. Help learners build real projects and gain confidence in their skills.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
            <div className="text-6xl">💡</div>
            <h2 className="text-2xl font-bold">Problem Solved</h2>
            <p className="text-lg">
              Many beginners struggle to find structured guidance and interactive projects. EduTech provides a step-by-step path to learn coding effectively.
            </p>
          </div>
        </div>

        
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes slide-in-left {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-left {
            animation: slide-in-left 1s ease-out forwards;
          }

          @keyframes fade-in-up {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }

          .scrollbar-thin {
            scrollbar-width: thin;
          }
          .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb {
            background-color: #3b82f6;
            border-radius: 9999px;
          }
          .scrollbar-track-gray-800::-webkit-scrollbar-track {
            background-color: #1f2937;
          }
          .scrollbar-thumb-blue-500::-webkit-scrollbar {
            width: 8px;
          }
        `}
      </style>
    </div>
  );
}
