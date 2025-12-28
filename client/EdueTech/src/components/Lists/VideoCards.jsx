import ListContainer from "./ListContainer";
import VideoCard from "./VideoCard";


const videos = [
    {
        id: 1,
        title: "React Hooks Explained",
        youtubeUrl: "https://www.youtube.com/watch?v=f687hBjwFcM",
        duration: "15:30",
        category: "Advanced React",
    },

    {
        id: 2,
        title: "Building RESTful APIs with Express",
        duration: "22:45",
        category: "Express & APIs",
        thumbnail: "https://source.unsplash.com/400x250/?nodejs",
    },
];

const VideosCards = () => {
    return (
        <ListContainer
            title="Video Library"
            subtitle="Your saved learning videos"
            items={videos}
            renderCard={(video) => (
                <VideoCard key={video.id} video={video} />
            )}
        />
    );
};

export default VideosCards;
