import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/context";
import { Link } from "react-router-dom";
import TopicGrid from "./TopicGrid";
import { 
    FaEnvelope, 
    FaCalendarAlt, 
    FaTrophy, 
    FaBullseye, 
    FaChartLine, 
    FaVideo, 
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaEdit,
    FaPencilAlt
} from "react-icons/fa";

export default function UserTopics() {
    const { user } = useContext(UserContext);
    const [myTopics, setMyTopics] = useState([]);
    const [enrolledTopics, setEnrolledTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Overview");

    const getInitials = () => {
        if (!user) return "";
        return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
    };

    const getJoinDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const totalTopics = myTopics.length + enrolledTopics.length;
    const totalVideos = enrolledTopics.reduce((sum, topic) => sum + (topic.videos?.length || 0), 0) +
                       myTopics.reduce((sum, topic) => sum + (topic.videos?.length || 0), 0);
    
    const learningStreak = 7; 

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const myRes = await axios.get(
                    `http://localhost:8000/userAiTopics/${user.id}`
                );
                const enrolledRes = await axios.get(
                    `http://localhost:8000/getTopicsForUser/${user.id}`
                );
                setMyTopics(myRes.data);
                setEnrolledTopics(enrolledRes.data);
            } catch (err) {
                console.error("Failed to load topics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (!user) return <h2 className="text-white text-center mt-8">Please login to view your topics</h2>;
    if (loading) return <h3 className="text-white text-center mt-8">Loading…</h3>;

    const tabs = ["Overview", "Skills & Progress", "Achievements", "Settings"];

    return (
        <div className="min-h-screen pb-8">
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white px-6 py-8 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-blue-600 shadow-lg">
                                {getInitials()}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 border-2 border-white cursor-pointer hover:bg-blue-600 transition">
                                <FaPencilAlt className="text-white text-xs" />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {user.firstName} {user.lastName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-2">
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="text-white/80" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-white/80" />
                                    <span>Joined {getJoinDate()}</span>
                                </div>
                            </div>
                            <p className="text-white/90 text-sm md:text-base max-w-2xl">
                                Full-stack developer passionate about building scalable web applications. Currently focusing on React and Node.js.
                            </p>
                        </div>

                        <Link
                            to="#"
                            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 border border-blue-300"
                        >
                            <FaEdit />
                            Edit Profile
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <FaTrophy className="text-yellow-300" />
                                <span className="text-sm text-white/80">Total Points</span>
                            </div>
                            <div className="text-2xl font-bold">0</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <FaBullseye className="text-blue-300" />
                                <span className="text-sm text-white/80">Tasks Completed</span>
                            </div>
                            <div className="text-2xl font-bold">0</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <FaChartLine className="text-green-300" />
                                <span className="text-sm text-white/80">Learning Streak</span>
                            </div>
                            <div className="text-2xl font-bold">{learningStreak} days</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <FaVideo className="text-purple-300" />
                                <span className="text-sm text-white/80">Videos Saved</span>
                            </div>
                            <div className="text-2xl font-bold">{totalVideos}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto">
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                                    activeTab === tab
                                        ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === "Overview" && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>Member Since: {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-gray-400" />
                                    <a href="#" className="text-blue-600 hover:underline">github.com/{user.firstName?.toLowerCase()}{user.lastName?.toLowerCase()}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-gray-400" />
                                    <a href="#" className="text-blue-600 hover:underline">linkedin.com/in/{user.firstName?.toLowerCase()}{user.lastName?.toLowerCase()}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGlobe className="text-gray-400" />
                                    <a href="#" className="text-blue-600 hover:underline">{user.firstName?.toLowerCase()}{user.lastName?.toLowerCase()}.dev</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Statistics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-blue-600 mb-1">0m</div>
                                    <div className="text-sm text-gray-600">Current session</div>
                                </div>
                                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-orange-600 mb-1">{totalTopics}</div>
                                    <div className="text-sm text-gray-600">{totalTopics} completed</div>
                                </div>
                                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-green-600 mb-1">{totalVideos}</div>
                                    <div className="text-sm text-gray-600">Videos saved</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Learning Plans</h2>
                            {myTopics.length === 0 ? (
                                <p className="text-gray-600">No saved plans yet.</p>
                            ) : (
                                <TopicGrid topics={myTopics} />
                            )}
                            
                            {enrolledTopics.length > 0 && (
                                <>
                                    <hr className="my-6 border-gray-200" />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Topics</h3>
                                    <TopicGrid topics={enrolledTopics} label="Enrolled" />
                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Skills & Progress" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills & Progress</h2>
                        <p className="text-gray-600">Skills and progress tracking coming soon...</p>
                    </div>
                )}

                {activeTab === "Achievements" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
                        <p className="text-gray-600">Your achievements will appear here...</p>
                    </div>
                )}

                {activeTab === "Settings" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    value={user.email} 
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Link
                                    to="/calendar"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    📅 Calendar
                                </Link>
                                <Link
                                    to="/charts"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    📊 Learning Analytics
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
