import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/context.jsx";

export default function AdminTopics() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getTopics");
      setTopics(res.data);
    } catch (err) {
      console.error("Failed to fetch topics", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Admin access only</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading topics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">📚 Admin Topics</h2>

          <Link
            to="/editor"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ➕ Create Topic
          </Link>
        </div>

        {topics.length === 0 ? (
          <p className="text-gray-500">No topics created yet.</p>
        ) : (
          <ul className="space-y-4">
            {topics.map((topic) => (
              <li
                key={topic._id}
                className="flex justify-between items-center p-4 border rounded bg-gray-50 hover:shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{topic.title}</h3>
                  
                  
                </div>

                <Link
                  to={`/topics/${topic._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
