import { Link } from "react-router-dom";

export default function TopicGrid({ topics, label }) {

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18
        }}>
            {topics.map(t => (
                <Link
                    key={t._id}
                    to={`/topic/${t._id}`}
                    style={{
                        textDecoration: "none",
                        color: "inherit"
                    }}
                >
                    <div style={{
                        background: "#fff",
                        borderRadius: 12,
                        padding: 14,
                        border: "1px solid #e5e5e5",
                        boxShadow: "0 6px 14px rgba(0,0,0,.06)"
                    }}>

                        {t.mainImage && (
                            <img
                                src={t.mainImage}
                                alt="cover"
                                style={{
                                    width: "100%",
                                    borderRadius: 10,
                                    marginBottom: 10
                                }}
                            />
                        )}

                        <h3>{t.topic}</h3>

                        <div style={{ fontSize: 12, color: "#666" }}>
                            {new Date(t.createdAt).toLocaleString()}
                        </div>

                        {/* ONLY show for enrolled topics */}
                        {label === "Enrolled" && (
                            <div style={{ marginTop: 6, color: "#16a34a" }}>
                                ✔ Enrolled
                            </div>
                        )}

                    </div>
                </Link>
            ))}
        </div>
    );
}
