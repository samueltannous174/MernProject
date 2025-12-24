
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeroGif from "../assets/hero.gif";

export default function AuthForm({ setUser }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const toggle = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({ first_name: "", last_name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    const url = isLogin
      ? "http://localhost:8000/api/auth/login"
      : "http://localhost:8000/api/auth/register";

    try {
      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message);

      if (isLogin && res.data.user) {
        setUser(res.data.user);
        navigate("/dashboard");
      }

      if (!isLogin) {
        setIsLogin(true);
        setFormData({ first_name: "", last_name: "", email: "", password: "" });
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.error || "Something went wrong!");
      setFormData({ ...formData, password: "" });
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img src={HeroGif} alt="Learning Platform" className="absolute w-full h-full object-cover" />
      <div className="absolute w-full h-full bg-black/40"></div>

      <div className="relative flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 animate-fade-in z-10">
          <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>

          {message && (
            <div className="mb-4 p-3 text-center bg-red-100 text-red-700 rounded">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input type="text" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                <input type="text" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"/>
              </>
            )}
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-300 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">{isLogin ? "Login" : "Register"}</button>
          </form>

          <p className="mt-6 text-center text-black">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={toggle} className="text-blue-600 cursor-pointer hover:underline">
              {isLogin ? "Register" : "Login"}
            </span>
          </p>

          <style>
            {`
              @keyframes fade-in {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
