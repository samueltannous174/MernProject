import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/context";
import { Link } from "react-router-dom";
import TopicGrid from "./TopicGrid";


export default function UserTopics() {

    const { user } = useContext(UserContext);

    const [myTopics, setMyTopics] = useState([]);
    const [enrolledTopics, setEnrolledTopics] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {

                // 1) Topics created / saved by user
                const myRes = await axios.get(
                    `http://localhost:8000/userAiTopics/${user.id}`
                );

                // 2) Topics user enrolled in (many-to-many)
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

    if (!user) return <h2>Please login to view your topics</h2>;
    if (loading) return <h3>Loading…</h3>;

    return (
        <div style={{ maxWidth: 1000, margin: "30px auto" }}>

            {/* My Generated / Saved Topics */}
            <h1>📚 My Learning Plans</h1>

            {myTopics.length === 0 && <p>No saved plans yet.</p>}

            <TopicGrid topics={myTopics} label="Saved" />

            <hr style={{ margin: "30px 0" }} />

            <h1>🎓 Enrolled Topics</h1>

            {enrolledTopics.length === 0 && <p>You are not enrolled in any topics yet.</p>}

            <TopicGrid topics={enrolledTopics} label="Enrolled" />

        </div>
    );
}
