import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroGif from "../assets/hero.gif";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-on-scroll");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-clip bg-gray-900">

      <section className="relative w-full h-[100dvh] overflow-hidden">
        <img
          src={HeroGif}
          alt="Learning Platform"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center pl-16 text-white bg-black/10">
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Start Your <br /> Coding Adventure
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Beginner friendly coding courses and projects
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-300 hover:scale-105 active:scale-95 transition-all duration-300 font-bold"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gray-900 text-white py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 fade-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-6xl">✨</div>
              <h2 className="text-2xl font-bold">Features</h2>
              <ul className="space-y-2 text-lg opacity-80">
                <li>Beginner-friendly tutorials</li>
                <li>Project-based learning</li>
                <li>Community support</li>
                <li>Quizzes & challenges</li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-6xl">🌟</div>
              <h2 className="text-2xl font-bold">Purpose</h2>
              <p className="text-lg opacity-80">
                Make coding accessible, fun, and practical for everyone.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-6xl">💡</div>
              <h2 className="text-2xl font-bold">Problem Solved</h2>
              <p className="text-lg opacity-80">
                EduTech gives beginners a clear structured learning path.
              </p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        /* Essential CSS Resets */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden; /* Fallback for older browsers */
        }

        @keyframes slide-in-left {
          0% { transform: translateX(-40px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        @keyframes fade-in-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Prevent flicker before animation starts */
        .fade-on-scroll {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}