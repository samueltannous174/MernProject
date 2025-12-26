
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import HeroGif from "../assets/hero.gif"; 

// export default function AuthForm({ setUser }) {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const toggle = () => {
//     setIsLogin(!isLogin);
//     setMessage("");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isLogin
//   ? "http://localhost:8000/api/auth/login"
//   : "http://localhost:8000/api/auth/register";

//     try {
//       const res = await axios.post(url, formData);
//       setMessage(res.data.message);

//       if (isLogin && res.data.user) {
//         setUser(res.data.user);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.error || "Error occurred");
//     }
//   };

//   return (
//     <div className="relative w-screen h-screen overflow-hidden">
//       <img
//         src={HeroGif}
//         alt="Learning Platform"
//         className="absolute w-full h-full object-cover"
//       />

//       {/* Overlay to dim the image */}
//       <div className="absolute w-full h-full bg-black/40"></div>

//       {/* Form */}
//       <div className="relative flex items-center justify-center w-full h-full">
//         <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 animate-fade-in z-10">
//           <h2 className="text-3xl font-bold text-center mb-6">
//             {isLogin ? "Login" : "Register"}
//           </h2>

//           {message && (
//             <div className="mb-4 p-3 text-center bg-red-100 text-red-700 rounded">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {!isLogin && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   name="first_name"
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   name="last_name"
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   required
//                 />
//               </>
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//               required
//             />
//             <button className="w-full py-3 
//             bg-gradient-to-r from-blue-500 to-green-300 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-black">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <span
//               onClick={toggle}
//               className="text-blue-600 cursor-pointer hover:underline"
//             >
//               {isLogin ? "Register" : "Login"}
//             </span>
//           </p>

//           <style>
//             {`
//               @keyframes fade-in {
//                 0% { opacity: 0; transform: translateY(20px); }
//                 100% { opacity: 1; transform: translateY(0); }
//               }
//               .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
//             `}
//           </style>
//         </div>
//       </div>
//     </div>
//   );
// }
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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8000/api/auth/login"
      : "http://localhost:8000/api/auth/register";

    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message);

      if (isLogin && res.data.user) {
        setUser(res.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={HeroGif}
        alt="Learning Platform"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay to dim the image */}
      <div className="absolute w-full h-full bg-black/40"></div>

      {/* Form */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 animate-fade-in z-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Register"}
          </h2>

          {message && (
            <div className="mb-4 p-3 text-center bg-red-100 text-red-700 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button className="w-full py-3 
            bg-gradient-to-r from-blue-500 to-green-300 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-black">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={toggle}
              className="text-blue-600 cursor-pointer hover:underline"
            >
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
