import { useEffect, useState } from "react";
import ListContainer from "./ListContainer";
import TopicCard from "./TopicCard";

const TopicsCards = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch("http://localhost:8000/getTopics");
                const data = await res.json();
                setTopics(data);
                console.log(data);
            } catch (err) {
                console.error("Failed to fetch topics:", err);
            } finally {
                setLoading(false);
            }
        };
    

        fetchTopics();
    }, []);
    console.log(topics);

    if (loading) return <p>Loading topics...</p>;

    return (
        <ListContainer
            title="My Topics"
            subtitle="Track your learning progress"
            items={topics}
            renderCard={(topic) => (
                <TopicCard key={topic._id} topic={topic} />
            )}
        />
    );
};

export default TopicsCards;
