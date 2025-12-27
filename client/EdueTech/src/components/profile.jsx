
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/context.jsx";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        // Fetch user profile
        const res = await axios.get(`http://localhost:8000/profile/${user._id}`);
        setUser(res.data.user);

        // Fetch courses
        const coursesRes = await axios.get(`http://localhost:8000/courses/${user._id}`);
        setCourses(coursesRes.data.courses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, setUser]);

  const addTopics = () => {
    setUser(null);
    navigate("/topics/:id");
  };

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Welcome, {user.firstName} {user.lastName}
        </h2>
        <p className="text-center text-gray-600 mb-6">{user.email}</p>

        <div className="flex justify-center gap-4 mb-6">
          <Link
            to="/calendar"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            📅 Calendar
          </Link>
          <Link
            to="/charts"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            📊 Learning Analytics
          </Link>
          
         
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Your Courses</h3>
          {courses.length === 0 ? (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="p-4 border rounded hover:shadow-md transition bg-gray-50 flex justify-between items-center"
                >
                  <span>{course.title}</span>
                  <Link
                    to={`/videos/${course._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
          

        </div>
        
       

        

        
      </div>
    </div>
  );
}
