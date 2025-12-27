import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";


const TopicCard = ({ topic }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            {topic.mainImage ? (
                <img
                    src={topic.mainImage}
                    alt={topic.title}
                    className="h-52 w-full object-cover"
                />
            ) : (
                <div
                    className={`h-52 flex items-center justify-center bg-gradient-to-r ${topic.color}`}
                >
                    <div className="w-12 h-12 border-2 border-white rounded-md" />
                </div>
            )}

            <div className="p-5 space-y-3">

                <h3 className="text-lg font-semibold">
                    {topic.title || "Untitled Topic"}
                </h3>

                {topic.description && (
                    <p className="text-sm text-gray-500">
                        {topic.description}
                    </p>
                )}

                {/* keep progress UI if you use it */}
                {topic.progress !== undefined && (
                    <>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-semibold">{topic.progress}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-purple-600"
                                style={{ width: `${topic.progress}%` }}
                            />
                        </div>
                    </>
                )}

                <button className="text-purple-600 font-semibold">
                    <Link to={`/topics/${topic._id}`}>
                        Continue Learning →
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default TopicCard;