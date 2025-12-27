import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";


const getYouTubeId = (url) => {
    if (!url) return null;

    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    return url.match(regExp)?.[2] || null;
};

const VideoPlayer = ({ videos }) => {
    const { id } = useParams();

    const video = videos.find(v => v.id === Number(id));
    const videoId = getYouTubeId(video?.youtubeUrl);

    if (!video || !videoId) {
        return <p className="text-center mt-10">Video not found</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
            <h1 className="text-2xl font-bold">{video.title}</h1>

            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <p className="text-gray-500">{video.category}</p>
        </div>
    );
};

export default VideoPlayer;
