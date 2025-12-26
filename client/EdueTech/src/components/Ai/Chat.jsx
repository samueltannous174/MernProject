import { useState } from "react";
import axios from "axios";

export default function Chat() {
    const [topic, setTopic] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!topic.trim()) {
            setReply("Please enter a topic first.");
            return;
        }

        try {
            setLoading(true);
            setReply("");

            const res = await axios.post("http://localhost:8000/chat", {
                topic: topic
            });

            const text =
                res.data?.choices?.[0]?.message?.content ||
                "(no response from model)";

            setReply(text);
        } catch (err) {
            console.error(err);
            setReply("Server error — check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: 600, margin: "40px auto", fontFamily: "Arial" }}>
            <h2>AI Programming Tutor — Learning Resources Generator</h2>

            <input
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Enter a programming topic (e.g., React hooks)"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "16px"
                }}
            />

            <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                    padding: "10px 18px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                {loading ? "Generating…" : "Generate Resources"}
            </button>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    background: "#f4f4f4",
                    padding: "15px",
                    marginTop: "20px",
                    borderRadius: "8px",
                    minHeight: "120px"
                }}
            >
                {reply}
            </pre>
        </div>
    );
}
