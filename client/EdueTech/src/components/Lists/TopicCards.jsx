import ListContainer from "./ListContainer";
import TopicCard from "./TopicCard";

const topics = [
    {
        id: 1,
        title: "Full Stack Development",
        description: "Master React, Node.js, and Express",
        progress: 45,
        color: "from-purple-500 to-indigo-500",
    },
    {
        id: 2,
        title: "Advanced React",
        description: "Hooks, Context, and Performance",
        progress: 30,
        color: "from-blue-500 to-cyan-500",
    },
];

const TopicsCards = () => {
    return (
        <ListContainer
            title="My Topics"
            subtitle="Track your learning progress"
            items={topics}
            renderCard={(topic) => (
                <TopicCard key={topic.id} topic={topic} />
            )}
        />
    );
};

export default TopicsCards;
