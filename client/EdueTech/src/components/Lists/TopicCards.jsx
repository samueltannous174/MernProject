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

    if (loading) return <p style={{color:"white", fontSize:50 ,margin:40}}>Loading topics...</p>;

    return (
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
      My Topics
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

//         <ListContainer
//   title={<span style={{ color: "white", fontSize: 30 }}>My Topics</span>}
//   subtitle={
//     <span style={{ color: "#e5f0ff", fontSize: 20 }}>
//       Track your learning progress
//     </span>
//   }
//   items={topics}
//   renderCard={(topic) => (
//     <TopicCard key={topic._id} topic={topic} />
//   )}
// />

        // <ListContainer 
        //     title="My Topics"
        //     subtitle="Track your learning progress"
        //     items={topics}
            
        //     renderCard={(topic) => (
        //         <TopicCard key={topic._id} topic={topic} />
        //     )}
        // />
    );
};

export default TopicsCards;
