import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/context";


import ReactMarkdown from "react-markdown";


export default function Chat() {
    const [title, setTitle] = useState("");
    const [reply, setReply] = useState("");

    const [path, setPath] = useState([]);
    const [videos, setVideos] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const { user, token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [mainImage, setMainImage] = useState("");


    const extractMainImage = (text) => {
        const section = text.split("🖼")[1] || "";
        const url = section
            .split("\n")[1]
            ?.trim();

        return url?.startsWith("http") ? url : "";
    };





    const saveToDatabase = async () => {
        if (!user) {
            alert("You must be logged in to save");
            return;
        }

        try {
            const payload = {
                user: user.id,  
                title,
                mainImage,
                learningPath: path,
                videos,
                mistakes,
            };

            const res = await axios.post(
                "http://localhost:8000/createAiTopic",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Saved successfully 🎉");

        } catch (err) {
            console.error(err);
            alert("Failed to save");
        }
    };


    const extractLearningPath = (text) => {
        let section = text.split("🎯 Learning Path")[1] || "";

        section = section.split("🎥")[0];

        return section
            .split(/\n\d\)/)   
            .slice(1)
            .map(s => s.trim())
            .slice(0, 5);
    };



    const extractVideoBlocks = (text) => {
        const lines = text.split("\n");
        const results = [];

        for (let line of lines) {

            const match = line.match(/Stage\s+\d+\s+—\s+(.*?)\s+—\s+(https?:\/\/\S+)/);
            if (!match) continue;

            const title = match[1].trim();

            let url = match[2]
                .trim()
                .replace(/[>\)\]]+$/, "")
                .replace(/[\u200B-\u200D\uFEFF]/g, "");

            let videoId = "";

            if (url.includes("watch?v=")) {
                videoId = url.split("watch?v=")[1].split("&")[0];
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split(/[?\s]/)[0];
            }

            if (!videoId) continue;

            const embed = `https://www.youtube.com/embed/${videoId}`;

            results.push({ title, url, embed });
        }

        return results.slice(0, 5);
    };

    const extractMistakeBlocks = (text) => {
        const section = text.split("⚠️ 5 Common Mistakes")[1] || "";
        const items = section.split(/\n\d\)/).slice(1);
        return items.slice(0, 5).map(b => b.trim());
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

            const text =
                res.data?.choices?.[0]?.message?.content ||
                "(no response from model)";

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

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "40px auto",
                fontFamily: "Segoe UI, Arial"
            }}
        >
            <h1 style={{ marginBottom: 6 }}>AI Programming Tutor</h1>

            <p style={{ color: "#666", marginTop: 0 }}>
                Generates a structured learning path + videos + common mistakes guide
            </p>

            <div
                style={{
                    background: "white",
                    borderRadius: 14,
                    padding: 20,
                    boxShadow: "0 10px 24px rgba(0,0,0,.08)"
                }}
            >
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a topic — e.g., Frontend Roadmap, React Hooks, Java OOP"
                    style={{
                        width: "100%",
                        padding: 12,
                        fontSize: 16,
                        borderRadius: 8,
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        marginTop: 10,
                        padding: "10px 18px",
                        fontSize: 16,
                        borderRadius: 8,
                        border: "none",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Generating…" : "Generate Learning Plan"}
                </button>

                <div
                    style={{
                        marginTop: 20,
                        background: "#f7f7f7",
                        padding: 18,
                        borderRadius: 12,
                        lineHeight: 1.65
                    }}
                >
                    <ReactMarkdown>{reply}</ReactMarkdown>
                </div>

                {mainImage && (
                    <div style={{ marginTop: 20 }}>
                        <img
                            src={mainImage}
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


                {path.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>🎯 Learning Path</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                gap: 18,
                                marginTop: 10
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
                                        height: "100%"
                                    }}
                                >
                                    <strong style={{ color: "#2563eb" }}>
                                        🚀 Stage {i + 1}
                                    </strong>

                                    <div
                                        style={{
                                            marginTop: 6,
                                            overflowWrap: "anywhere",
                                            lineHeight: 1.55
                                        }}
                                    >
                                       {p}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {videos.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>🎥 Video Resources</h2>

                        {videos.map((v, i) => (
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

                {mistakes.length > 0 && (
                    <>
                        <h2 style={{ marginTop: 28 }}>⚠️ Common Pitfalls</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                gap: 18,
                                marginTop: 10
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
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%"
                                    }}
                                >
                                    <strong style={{ color: "#c62828", marginBottom: 6 }}>
                                        ⚠️ Mistake {i + 1}
                                    </strong>

                                    <div
                                        style={{
                                            overflowWrap: "anywhere",
                                            lineHeight: 1.55
                                        }}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <pre
                                                        style={{
                                                            background: "#f4f4f4",
                                                            padding: "10px",
                                                            borderRadius: 8,
                                                            whiteSpace: "pre-wrap",
                                                            wordBreak: "break-word",
                                                            overflowX: "visible",
                                                            marginTop: 8
                                                        }}
                                                        {...props}
                                                    />
                                                ),
                                                code: ({ node, ...props }) => (
                                                    <code
                                                        style={{
                                                            background: "#eee",
                                                            padding: "2px 4px",
                                                            borderRadius: 6,
                                                            wordBreak: "break-word"
                                                        }}
                                                        {...props}
                                                    />
                                                )
                                            }}
                                        >
                                            {m}
                                        </ReactMarkdown>
                                    </div>
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
                            cursor: user ? "pointer" : "not-allowed"
                        }}
                    >
                        ✔ Accept & Save to My Learning Plans
                    </button>
                )}


            </div>
        </div>
    );
}
