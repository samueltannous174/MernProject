
import { Link } from "react-router-dom";
import HeroGif from "../assets/hero.gif"; // adjust path if needed

export default function NavBar({ user }) {
  return (
    <nav   className="bg-gray-900">
      {/* Hero Image */}
      {/* <img
        src={HeroGif}
        alt="Learning Platform"
        className="absolute inset-0 w-full h-20 "
      /> */}

      

      
      <div className="relative z-10 w-full flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent cursor-pointer">
          EduTech
        </h1>

        {/* Button */}
        {!user ? (
          <Link
            to="/auth"
            className="px-5 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Login / Register
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="px-5 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
