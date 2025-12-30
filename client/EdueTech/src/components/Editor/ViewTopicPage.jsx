import { useEffect, useState, memo } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useParams } from "react-router-dom";


import "draft-js/dist/Draft.css";

const Media = memo(({ block, contentState }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    if (type === "image") {
        return (
            <img
                src={src}
                alt=""
                style={{ maxWidth: "60%", borderRadius: 10, margin: "10px 0" }}
            />
        );
    }

    if (type === "video") {
        return (
            <video
                src={src}
                controls
                style={{ maxWidth: "70%", borderRadius: 10, margin: "10px 0" }}
            />
        );
    }

    return null;
});

const blockRendererFn = (block) => {
    if (block.getType() === "atomic") {
        return { component: Media, editable: false };
    }
    return null;
};

export default function ViewTopicPage() {

    const { id } = useParams();

    const [topic, setTopic] = useState(null);
    const [editorState, setEditorState] = useState(null);

    useEffect(() => {
        const fetchTopic = async () => {
            const res = await fetch(`http://localhost:8000/getTopicById/${id}`);
            const data = await res.json();

            setTopic(data);

            if (data.content) {
                const contentState = convertFromRaw(data.content);
                setEditorState(EditorState.createWithContent(contentState));
            }
        };

        fetchTopic();
    }, [id]);

    if (!topic || !editorState) return <p style={{ padding: 30 }}>Loading…</p>;

    return (
        <div style={{ maxWidth: "80%", margin: "25px auto" }}>

            <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 10 }}>
                {topic.title}
            </h1>

            <div
                style={{
                    padding: 16,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#859eaaff",
                    lineHeight: 1.6
                }}
            >
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    customStyleMap={{}}
                    blockRendererFn={blockRendererFn}
                />
            </div>
        </div>
    );
}
