
import { Link } from "react-router-dom";
import HeroGif from "../assets/hero.gif"; 

export default function NavBar({ user }) {
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent cursor-pointer transition-transform hover:scale-110 hover:animate-bounce">
          EduTech 🚀
        </h1>

        {!user ? (
          <Link
            to="/auth"
            className="px-5 py-2 border border-white text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-blue-400/50 flex items-center gap-2"
          >
            🔑 Login / Register
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="px-5 py-2 border border-white text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-green-400/50 flex items-center gap-2"
          >
            🏠 Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
