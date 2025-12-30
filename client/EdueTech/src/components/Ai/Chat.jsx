import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/context";
import ReactMarkdown from "react-markdown";

export default function Chat() {
    const [title, setTitle] = useState("");
    const [reply, setReply] = useState("");
    const [path, setPath] = useState([]);
    const [videos, setVideos] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, token } = useContext(UserContext);
    const navigate = useNavigate();

    const extractMainImage = (text) => {
        const section = text.split("🖼")[1] || "";
        const url = section.split("\n")[1]?.trim();
        return url?.startsWith("http") ? url : "";
    };

    const extractLearningPath = (text) => {
        let section = text.split("🎯 Learning Path")[1] || "";
        section = section.split("🎥")[0];
        return section
            .split(/\n\d\)/)
            .slice(1)
            .map((s) => s.trim())
            .slice(0, 5);
    };

    const extractVideoBlocks = (text) => {
        const lines = text.split("\n");
        const results = [];

        for (let line of lines) {
            const match = line.match(/Stage\s+\d+\s+—\s+(.*?)\s+—\s+(https?:\/\/\S+)/);
            if (!match) continue;

            const title = match[1].trim();
            let url = match[2].trim().replace(/[>\)\]]+$/, "").replace(/[\u200B-\u200D\uFEFF]/g, "");
            let videoId = "";

            if (url.includes("watch?v=")) {
                videoId = url.split("watch?v=")[1].split("&")[0];
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split(/[?\s]/)[0];
            }

            if (!videoId) continue;
            results.push({ title, url, embed: `https://www.youtube.com/embed/${videoId}` });
        }

        return results.slice(0, 5);
    };

    const extractMistakeBlocks = (text) => {
        const section = text.split("⚠️ 5 Common Mistakes")[1] || "";
        const items = section.split(/\n\d\)/).slice(1);
        return items.slice(0, 5).map((b) => b.trim());
    };

    const sendMessage = async () => {
        if (!title.trim()) {
            setReply("Please enter a topic first.");
            return;
        }

        try {
            setLoading(true);
            setReply("");
            setVideos([]);
            setMistakes([]);
            setPath([]);
            setMainImage("");

            const res = await axios.post("http://localhost:8000/chat", { title });
            const text = res.data?.content || "(no response from model)";

            setReply(text);
            setPath(extractLearningPath(text));
            setVideos(extractVideoBlocks(text));
            setMistakes(extractMistakeBlocks(text));
            setMainImage(extractMainImage(text));
        } catch (err) {
            console.error(err);
            setReply("Server error — check console.");
        } finally {
            setLoading(false);
        }
    };

    const saveToDatabase = async () => {
        if (!user) return alert("You must be logged in to save");

        try {
            const payload = {
                user: user.id,
                title,
                mainImage,
                learningPath: path,
                videos,
                mistakes,
            };

            await axios.post("http://localhost:8000/createAiTopic", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/my-topics");
        } catch (err) {
            console.error(err);
            navigate("/my-topics");
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: "40px auto", fontFamily: "Segoe UI, Arial" }}>
            <h1 style={{ marginBottom: 6, color: "white", fontSize: 40 }}>AI Programming Tutor</h1>
            <p style={{ color: "white", fontSize: 20 }}>
                Generates a structured learning path + videos + common mistakes guide
            </p>

            <div
                style={{
                    background: "linear-gradient(to left, #6d9dea, #e5ebe7)",
                    borderRadius: 14,
                    padding: 20,
                    boxShadow: "0 10px 24px rgba(0,0,0,.08)",
                    margin: "40px 0",
                }}
            >
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a topic — e.g., Frontend Roadmap, React Hooks, Java OOP"
                    style={{
                        width: "100%",
                        padding: 12,
                        fontSize: 20,
                        borderRadius: 8,
                        background: "#fff",
                        border: "1px solid #ccc",
                        color: "#333",
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        marginTop: 50,
                        padding: "10px 18px",
                        fontSize: 20,
                        borderRadius: 8,
                        border: "none",
                        background: "linear-gradient(to right, #3B82F6, #86EFAC)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Generating…" : "Generate Learning Plan"}
                </button>

                <div style={{ marginTop: 20, background: "#f7f7f7", padding: 18, borderRadius: 12, lineHeight: 1.65 }}>
                    <ReactMarkdown>{reply}</ReactMarkdown>
                </div>

                {mainImage && (
                    <div style={{ marginTop: 20 }}>
                        <img
                            src={mainImage}
                            alt="Topic cover"
                            style={{ width: "100%", borderRadius: 14, objectFit: "cover", maxHeight: 360 }}
                        />
                    </div>
                )}

                {path.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>Learning Path</h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                gap: 18,
                                marginTop: 10,
                            }}
                        >
                            {path.map((p, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: 14,
                                        border: "1px solid #e3e3e3",
                                        boxShadow: "0 6px 14px rgba(0,0,0,.06)",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <strong style={{ color: "#2563eb" }}>Stage {i + 1}</strong>
                                    <div style={{ lineHeight: 1.55 }}>{p}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {videos.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>Video Resources</h2>
                        {videos.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "#fff",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 12,
                                    border: "1px solid #e5e5e5",
                                    boxShadow: "0 6px 16px rgba(0,0,0,.08)",
                                }}
                            >
                                <iframe
                                    src={v.embed}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`video-${i}`}
                                    style={{ width: "100%", aspectRatio: "16/9", borderRadius: 10, border: "1px solid #ddd" }}
                                />
                                <div style={{ marginTop: 8 }}>
                                    <strong>{v.title}</strong>
                                    <div style={{ fontSize: 12, color: "#666" }}>{v.url}</div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {mistakes.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>⚠️ Common Pitfalls</h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                gap: 18,
                                marginTop: 10,
                            }}
                        >
                            {mistakes.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: 14,
                                        border: "1px solid #e3e3e3",
                                        boxShadow: "0 6px 14px rgba(0,0,0,.06)",
                                    }}
                                >
                                    <strong style={{ color: "#c62828", marginBottom: 6 }}>⚠️ Mistake {i + 1}</strong>
                                    <ReactMarkdown
                                        components={{
                                            pre: (props) => (
                                                <pre
                                                    style={{
                                                        background: "linear-gradient(to left,#e9ecf0,#96cfef)",
                                                        padding: "10px",
                                                        borderRadius: 8,
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                    {...props}
                                                />
                                            ),
                                            code: (props) => (
                                                <code
                                                    style={{
                                                        background: "linear-gradient(to left,#e9ecf0,#96cfef)",
                                                        padding: "2px 4px",
                                                        borderRadius: 6,
                                                    }}
                                                    {...props}
                                                />
                                            ),
                                        }}
                                    >
                                        {m}
                                    </ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {path.length > 0 && (
                    <button
                        onClick={saveToDatabase}
                        disabled={!user}
                        style={{
                            marginTop: 20,
                            padding: "10px 18px",
                            fontSize: 16,
                            borderRadius: 8,
                            border: "none",
                            background: user ? "#16a34a" : "#9ca3af",
                            color: "white",
                            cursor: user ? "pointer" : "not-allowed",
                        }}
                    >
                        Accept & Save to My Learning Plans
                    </button>
                )}
            </div>
        </div>
    );
}
