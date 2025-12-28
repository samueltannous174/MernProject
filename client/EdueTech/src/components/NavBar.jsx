import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/context.jsx";
import HeroGif from "../assets/hero.gif";

// 👉 ICONS
import { FaHome, FaBook, FaCalendarAlt, FaChartBar, FaComments } from "react-icons/fa";

export default function NavBar() {

  const { user, logoutUser } = useContext(UserContext);

  return (
    <nav className="relative w-full bg-gray-900 overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <img
          src={HeroGif}
          alt="hero background"
          className="w-full h-full object-cover opacity-20 animate-fadeIn"
        />
      </div>

      <div className="relative z-10 w-full flex justify-between items-center px-8 py-4">

        {/* LOGO */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent cursor-pointer transition-transform hover:scale-110 hover:animate-bounce">
          EduTech 🚀
        </h1>

        {/* NAV LINKS WITH ICONS */}
        <div className="flex items-center gap-6 text-white font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaHome /> Home
          </Link>

          <Link to="/topics" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaBook /> Topics
          </Link>

          <Link to="/calendar" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaCalendarAlt /> Calendar
          </Link>

          <Link to="/charts" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaChartBar /> Charts
          </Link>
          <Link to="/editor" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaBook /> Editor
          </Link>

          <Link to="/chat" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaComments /> Ai Assistant
          </Link>

        </div>

        {/* AUTH BUTTONS (UNCHANGED) */}
        <div className="flex items-center gap-4">

          {!user ? (
            <Link
              to="/auth"
              className="px-5 py-2 border border-white text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-blue-400/50 flex items-center gap-2"
            >
              🔑 Login / Register
            </Link>
          ) : (
            <>
              <button
                onClick={logoutUser}
                className="px-5 py-2 border border-red-500 text-red-500 rounded-lg font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-400/50 flex items-center gap-2"
              >
                🚪 Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
