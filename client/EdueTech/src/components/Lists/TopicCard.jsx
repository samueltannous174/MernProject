import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { Link } from "react-router-dom";

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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
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

    // 🟣 Progress calculations (safe defaults)
    const completedVideos = topic.completedVideos || 0;
    const totalVideos = topic.totalVideos || 1;
    const progressPercent = Math.round(
        (completedVideos / totalVideos) * 100
    );

    const handleContinue = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/video-progress/resume?userId=${user.id}&topicId=${topic._id}`
            );
            const data = await res.json();
            console.log(data);
            

            if (data) {
                alert(
                    `Resume video ${data.videoId} at ${data.watchedSeconds} seconds`
                );
                // 👉 Redirect to video page if you have one
                // navigate(`/watch/${topic._id}/${data.videoId}`)
            } else {
                alert("Start from the first video");
            }
        } catch (err) {
            console.error("Resume failed:", err);
        }
    };

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 12,
                padding: 14,
                border: "1px solid #e5e5e5",
                boxShadow: "0 6px 14px rgba(0,0,0,.06)",
            }}
        >
            {topic.mainImage && (
                <img
                    src={topic.mainImage}
                    alt={topic.title}
                    style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 12,
                    }}
                />
            )}

            <h3>{topic.title}</h3>

            {!user.role === "admin" && (
                <>
                    {isEnrolled ? (
                        <button disabled>✔ Enrolled</button>
                    ) : (
                        <button onClick={handleEnroll} disabled={enrolling}>
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
                    fontWeight: "600",
                }}
            >
                View Details
            </Link>

            {user && isEnrolled && (
                <div style={{ marginTop: 14 }}>
                    <div
                        style={{
                            width: "100%",
                            height: 6,
                            background: "#e5e7eb",
                            borderRadius: 4,
                        }}
                    >
                        <div
                            style={{
                                width: `${progressPercent}%`,
                                height: "100%",
                                background: "#7c6cf6",
                                borderRadius: 4,
                                transition: "width 0.3s",
                            }}
                        />
                    </div>

                    <p
                        style={{
                            fontSize: 12,
                            color: "#6b7280",
                            marginTop: 6,
                        }}
                    >
                        {progressPercent}% completed
                    </p>

                    <button
                        onClick={handleContinue}
                        style={{
                            marginTop: 8,
                            width: "100%",
                            padding: "8px",
                            background: "#7c6cf6",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Continue Learning →
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopicCard;