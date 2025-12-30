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
    console.log(myTopics);
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
<<<<<<< HEAD


    if (!user) return <h2>Please login to view your topics</h2>;
    if (loading) return <h3>Loading…</h3>;



    const mergedTopics = [
        ...myTopics.map(t => ({ ...t, isEnrolled: false })),
        ...enrolledTopics.map(t => ({ ...t, isEnrolled: true }))
    ];

    const uniqueTopics = Array.from(
        new Map(mergedTopics.map(t => [t._id, t])).values()
    );


=======
    if (!user) return <h2>Please login to view your topics</h2>;
    if (loading) return <h3 >Loading…</h3>;
>>>>>>> main
    return (

        <div style={{ maxWidth: 1000, margin: "30px auto" }}>
<<<<<<< HEAD

            <div className="max-w-4xl mx-auto bg-[#96cfef] rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Welcome, {user.firstName} {user.lastName}
                </h2>

                <p className="text-center text-gray-600 mb-6">{user.email}</p>

                <div className="flex justify-center gap-4 mb-6">
                    <Link
                        to="/calendar"
                        className="px-4 py-2 bg-[#121314] text-white rounded hover:bg-blue-600 transition"
                    >
                        📅 Calendar
                    </Link>

                    <Link
                        to="/charts"
                        className="px-4 py-2 bg-[#121314]    text-white rounded hover:bg-green-600 transition"
                    >
                        📊 Learning Analytics
                    </Link>
                </div>
            </div>


            <h1
                style={{
                    color: "white",
                    margin: "30px 0",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "40px"
                }}
            >
                My Learning Plans
            </h1>


            {uniqueTopics.length === 0 && (
                <p style={{ color: "white", fontSize: "20px" }}>
                    No topics yet.
                </p>
            )}

            <TopicGrid topics={uniqueTopics} />

=======
            <div className="max-w-4xl mx-auto bg-white rounded-lg  p-8">
            <h2 className="text-3xl font-bold mb-2 text-center">
                Welcome, {user.firstName} {user.lastName}
            </h2>
            <p className="text-center text-gray-600 mb-6">{user.email}</p>
            <div className="flex justify-center gap-4 mb-6">
                <Link
                    to="/calendar"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    📅 Calendar
                </Link>
                <Link
                    to="/charts"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    📊 Learning Analytics
                </Link>
            </div>
            </div>
            <h1 style={{color:"white",size:30, margin: "30px 0",textAlign:"center",fontWeight:"bold",fontSize:"40px"}}>My Learning Plans</h1>
            
            {myTopics.length === 0 && <p style={{color:"white" ,size:20 ,fontSize:"20px"}}>No saved plans yet.</p>}
            <TopicGrid topics={myTopics} />
            <hr style={{ margin: "30px 0", color: "white" }} />
            
            {enrolledTopics.length === 0 && <p style={{color:"white" ,size:20 ,fontSize:"20px"}} >You are not enrolled in any topics yet.</p>}
            <TopicGrid topics={enrolledTopics} label="Enrolled" />
>>>>>>> main
        </div>
    );
}
