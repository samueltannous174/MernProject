import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import {Link} from "react-router-dom";

const TopicCard = ({ topic }) => {
    const { user } = useContext(UserContext);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(
        topic.users?.includes(user?.id) 
    );

    const handleEnroll = async () => {
        if (!user) {
            alert("Please login to enroll in this topic");
            return;
        }

        try {
            setEnrolling(true);

            const res = await fetch(
                `http://localhost:8000/addUserToTopic/${topic._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: user.id })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.error(data);
                alert(data.message || "Failed to enroll");
                return;
            }

            setIsEnrolled(true);

        } catch (err) {
            console.error("Enroll failed:", err);
        } finally {
            setEnrolling(false);
        }
    };

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 12,
                padding: 14,
                border: "1px solid #e5e5e5",
                boxShadow: "0 6px 14px rgba(0,0,0,.06)"
            }}
        >
            {topic.mainImage && (
                <img
                    src={topic.mainImage}
                    alt={topic.title || topic.topic}
                    style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 12
                    }}
                />
            )}

            <h3>{topic.title || topic.topic}</h3>

            {!user.role === "admin" && (
                <>
                    {isEnrolled ? (
                        <button disabled style={{  }}>
                            ✔ Enrolled
                        </button>
                    ) : (
                        <button
                            onClick={handleEnroll}
                            disabled={enrolling}
                            style={{ }}
                        >
                            {enrolling ? "Enrolling…" : "Enroll"}
                        </button>
                    )}
                </>
            )}



            <Link
                to={`/topics/${topic._id}`}
                style={{
                    display: "inline-block",
                    marginTop: 10,
                    marginLeft: 10,
                    fontSize: "14px",
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                View Details
            </Link>

         

        </div>
    );
};

export default TopicCard;
