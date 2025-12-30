import { useNavigate } from "react-router-dom";


const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    const handleWatch = () => {
        navigate(`/watch/${video.id}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
                src={`https://img.youtube.com/vi/${video.youtubeUrl?.split("v=")[1]}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-100 object-cover cursor-pointer"
                onClick={handleWatch}
            />

            <div className="p-4 space-y-2">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.category}</p>

                <button
                    onClick={handleWatch}
                    className="text-purple-600 font-semibold"
                >
                    Watch →
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
