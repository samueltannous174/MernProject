import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function TopicDetails() {

    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTopic = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/aiTopic/${id}`);
                setTopic(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();
    }, [id]);

    if (loading) return <h2 style={{ textAlign: "center" }}>Loading…</h2>;
    if (!topic) return <h2 style={{ textAlign: "center" }}>Topic not found</h2>;

    return (
        <div
            style={{
                maxWidth: "80%",
                margin: "40px auto",
                fontFamily: "Segoe UI, Arial"
            }}
        >

            <h1 style={{ marginBottom: 6 }}>{topic.topic}</h1>

            <p style={{ color: "#666", marginTop: 0 }}>
                Saved learning plan
            </p>

            <div
                style={{
                    background: "white",
                    borderRadius: 14,
                    padding: 20,
                    boxShadow: "0 10px 24px rgba(0,0,0,.08)"
                }}
            >

                {topic.mainImage && (
                    <div style={{ marginBottom: 20 }}>
                        <img
                            src={topic.mainImage}
                            alt="Topic cover"
                            style={{
                                width: "100%",
                                borderRadius: 14,
                                objectFit: "cover",
                                maxHeight: 360
                            }}
                        />
                    </div>
                )}

                {topic.learningPath?.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 10 }}>🎯 Learning Path</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                gap: 18,
                                marginTop: 10
                            }}
                        >
                            {topic.learningPath.map((p, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: 14,
                                        border: "1px solid #e3e3e3",
                                        boxShadow: "0 6px 14px rgba(0,0,0,.06)"
                                    }}
                                >
                                    <strong style={{ color: "#2563eb" }}>
                                        Stage {i + 1}
                                    </strong>

                                    <div style={{ marginTop: 6, lineHeight: 1.55 }}>
                                        {p}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {topic.videos?.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>🎥 Video Resources</h2>

                        {topic.videos.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "#fff",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 12,
                                    boxShadow: "0 6px 16px rgba(0,0,0,.08)",
                                    border: "1px solid #e5e5e5"
                                }}
                            >
                                <iframe
                                    src={v.embed}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`video-${i}`}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "16/9",
                                        borderRadius: 10,
                                        border: "1px solid #ddd"
                                    }}
                                />

                                <div style={{ marginTop: 8 }}>
                                    <strong>{v.title}</strong>
                                    <div style={{ fontSize: 12, color: "#666" }}>{v.url}</div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {topic.mistakes?.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}> Common Pitfalls</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(460px, 2fr))",
                                gap: 18,
                                marginTop: 10
                            }}
                        >
                            {topic.mistakes.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: 14,
                                        border: "1px solid #e3e3e3",
                                        boxShadow: "0 6px 14px rgba(0,0,0,.06)"
                                    }}
                                >
                                    <strong style={{ color: "#c62828" }}>
                                        Mistake {i + 1}
                                    </strong>

                                    <div style={{ marginTop: 6 }}>
                                        <ReactMarkdown>{m}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* <h2 style={{ marginTop: 28 }}>🧾 Full Response</h2>

                <div
                    style={{
                        background: "#f7f7f7",
                        padding: 18,
                        borderRadius: 12,
                        lineHeight: 1.65
                    }}
                >
                    <ReactMarkdown>{topic.fullResponse}</ReactMarkdown>
                </div>
 */}
            </div>
        </div>
    );
}
