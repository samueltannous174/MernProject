import { useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";


export default function Dashboard({ user, setUser }) {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/profile/${user._id}`
        );
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [user, setUser]);

  const logout = () => setUser(null);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Welcome, {user.first_name}
      </h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user._id}</p>
      <button
        onClick={logout}
        className="w-full mt-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
