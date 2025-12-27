import { useContext, useState } from "react";
import { UserContext } from "../../context/context";

const TopicCard = ({ topic }) => {
    const { user } = useContext(UserContext);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(
        topic.users?.includes(user?.id) // mark enrolled if already inside array
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

            {isEnrolled ? (
                <button
                    disabled
                    style={{
                        marginTop: 10,
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "none",
                        background: "#16a34a",
                        color: "white"
                    }}
                >
                    ✔ Enrolled
                </button>
            ) : (
                <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    style={{
                        marginTop: 10,
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "none",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    {enrolling ? "Enrolling…" : "Enroll"}
                </button>
            )}

        </div>
    );
};

export default TopicCard;
