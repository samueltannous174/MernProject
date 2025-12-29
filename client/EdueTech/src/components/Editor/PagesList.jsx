import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { styleMap, blockRendererFn } from "./EditorConfig";


export default function PagesList() {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await axios.get("http://localhost:8000/getTopics");
                setPages(res.data);
            } catch (err) {
                console.error("Error fetching pages:", err);
            }
        };
        fetchPages();
    },[]);

    return (
        <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: 'center', color: '#111', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
                Published Articles
            </h1>
            {pages.map((page) => (
                <article key={page._id} style={articleStyle}>
                    <h2 style={titleStyle}>{page.title}</h2>
                    <p style={dateStyle}>Published on: {new Date(page.createdAt).toLocaleDateString()}</p>
                    <div style={contentWrapper}>
                        <StaticRenderer rawContent={page.content} />
                    </div>
                </article>
            ))}
        </div>
    );
}

const StaticRenderer = ({ rawContent }) => {
    if (!rawContent) return null;
    const contentState = convertFromRaw(rawContent);
    const editorState = EditorState.createWithContent(contentState);
    return (
        <Editor
            editorState={editorState}
            readOnly={true}          
            onChange={() => { }}      
            customStyleMap={styleMap}
            blockRendererFn={blockRendererFn}
        />
    );
};

const articleStyle = {
    background: "#fff",
    padding: "30px",
    marginBottom: "50px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    lineHeight: "1.8"
};

const titleStyle = { fontSize: "32px", marginBottom: "5px", color: "#1a202c" };
const dateStyle = { color: "#718096", fontSize: "14px", marginBottom: "20px" };
const contentWrapper = { color: "#2d3748", fontSize: "18px" };