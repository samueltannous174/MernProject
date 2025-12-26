
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeroGif from "../assets/hero.gif";
import { UserContext } from "../context/context.jsx";
import { useContext } from "react";


export default function AuthForm() {
  const { loginUser } = useContext(UserContext);


  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const toggle = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setIsError(false);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8000/login"
      : "http://localhost:8000/register";

    const payload = isLogin
      ? {
        email: formData.email,
        password: formData.password,
      }
      : formData;

    try {
      const res = await axios.post(url, payload);

      setIsError(false);
      setMessage(res.data.message || "");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user && res.data.token) {
        loginUser(res.data.user, res.data.token);
      }


      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      
      setIsError(true);
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">

      <img
        src={HeroGif}
        alt="Learning Platform"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute w-full h-full bg-black/40" />

      <div className="relative flex items-center justify-center w-full h-full">

        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in">

          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 text-center rounded ${isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required={!isLogin}
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required={!isLogin}
                />

            
              </>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-300 text-white rounded-lg font-semibold"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={toggle}
              className="text-blue-600 cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>

          <style>
            {`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in { animation: fade-in .4s ease-out forwards; }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
