import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    if (loading) return <p style={{color:"white", fontSize:50 ,margin:40}}>Loading topics...</p>;

return (
  <div>
    <ListContainer
      title={
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "0.5px",
            background: "linear-gradient(to right, #ffffff, #dbeafe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            marginBottom: 4,
          }}
        >
          Platform Topics
        </span>
      }
      subtitle={
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#e0f2fe",
            opacity: 0.9,
            display: "block",
            marginBottom: 16,
          }}
        >
          Track your learning progress 
        </span>
      }
      items={topics}
      renderCard={(topic) => (
        <TopicCard key={topic._id} topic={topic} />
      )}
    />
    <Link to="/chat" className="mt-6 m-65 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-green-300 text-white rounded-lg hover:bg-purple-700 transition ">
      💬 Search For extra topic
    </Link>
  </div>
);
};

export default TopicsCards;
