

import { useNavigate } from "react-router-dom";
import HeroGif from "../assets/hero.gif";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Hero Image */}
      <img
        src={HeroGif}
        alt="Learning Platform"
        className="w-full h-full object-cover "
      />

      {/* Overlay Text - left side with animation */}
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
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            GET STARTED
          </button>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes slide-in-left {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-left {
            animation: slide-in-left 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
