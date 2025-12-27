import { useRef, useState, memo } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    AtomicBlockUtils,
    convertToRaw
} from "draft-js";

import "draft-js/dist/Draft.css";

const styleMap = {
    RED: { color: "red" },
    BLUE: { color: "#2563eb" },
    GREEN: { color: "#15803d" },
    ORANGE: { color: "#ea580c" },
    FS_14: { fontSize: "14px" },
    FS_18: { fontSize: "18px" },
    FS_24: { fontSize: "24px" },
    FS_32: { fontSize: "32px" },
};

const Media = memo(({ block, contentState }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    if (type === "image") {
        return (
            <img
                src={src}
                alt=""
                style={{ maxWidth: "20%", borderRadius: 10 }}
            />
        );
    }

    if (type === "video") {
        return (
            <video
                src={src}
                controls
                preload="metadata"
                style={{ maxWidth: "30%", borderRadius: 10 }}
            />
        );
    }
    return null;
});

const blockRendererFn = (block) => {
    if (block.getType() === "atomic") {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
};

export default function DraftAdvancedEditor() {

    const editorRef = useRef(null);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isSaving, setIsSaving] = useState(false);

    // NEW FIELDS
    const [title, setTitle] = useState("");
    const [mainImage, setMainImage] = useState(null);

    const applyColor = (style) =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));

    const applyFontSize = (size) =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, size));

    const toggleStyle = (style) =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));

    const toggleBlock = (block) =>
        setEditorState(RichUtils.toggleBlockType(editorState, block));

    const insertMedia = (type, src) => {
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity(type, "IMMUTABLE", { src });
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");

        setEditorState(
            EditorState.forceSelection(
                newState,
                newState.getCurrentContent().getSelectionAfter()
            )
        );
    };

    const addImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => insertMedia("image", reader.result);
        reader.readAsDataURL(file);
    };

    const addVideo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => insertMedia("video", reader.result);
        reader.readAsDataURL(file);
    };

    const handleMainImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const MAX_WIDTH = 500;   // 
                const scale = Math.min(MAX_WIDTH / img.width, 1);

                const canvas = document.createElement("canvas");
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // compress to JPEG (0.8 = good quality)
                const resizedImage = canvas.toDataURL("image/jpeg", 0.8);

                setMainImage(resizedImage);
            };
        };

        reader.readAsDataURL(file);
    };


    const handleSave = async () => {

        const rawContent = convertToRaw(editorState.getCurrentContent());

        const payload = {
            title,
            mainImage,
            content: rawContent,
        };

        try {
            setIsSaving(true);

            const res = await fetch("http://localhost:8000/postTopic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to save topic");
            }

            const savedTopic = await res.json();
            console.log("Saved topic:", savedTopic);
            alert("Content saved to DB ✅");

        } catch (err) {
            console.error(err);
            alert("Error saving content 😢");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: "80%", margin: "20px auto" }}>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter topic title"
                style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    marginBottom: 10,
                }}
            />

            <label style={{ display: "block", marginBottom: 8 }}>
                📌 Main Image
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                />
            </label>

            <button onClick={handleSave} style={btnStyle} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save content"}
            </button>

            <div style={toolbarStyle}>
                <button onClick={() => toggleStyle("BOLD")}>Bold</button>
                <button onClick={() => toggleStyle("ITALIC")}>Italic</button>
                <button onClick={() => toggleStyle("UNDERLINE")}>Underline</button>

                <span style={{ marginLeft: 12 }}>Font Size:</span>
                <button onClick={() => applyFontSize("FS_14")}>14</button>
                <button onClick={() => applyFontSize("FS_18")}>18</button>
                <button onClick={() => applyFontSize("FS_24")}>24</button>
                <button onClick={() => applyFontSize("FS_32")}>32</button>

                <span style={{ marginLeft: 12 }}>Color:</span>
                <button onClick={() => applyColor("RED")}>Red</button>
                <button onClick={() => applyColor("BLUE")}>Blue</button>

                <label style={{ cursor: "pointer" }}>
                    📷 Image
                    <input type="file" hidden accept="image/*" onChange={addImage} />
                </label>

                <label style={{ cursor: "pointer" }}>
                    🎬 Video
                    <input type="file" hidden accept="video/*" onChange={addVideo} />
                </label>
            </div>

            <div
                style={editorContainerStyle}
                onClick={() => editorRef.current?.focus()}
            >
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Write something..."
                    customStyleMap={styleMap}
                    blockRendererFn={blockRendererFn}
                />
            </div>
        </div>
    );
}

const btnStyle = {
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#f3f4f6",
    cursor: "pointer",
    marginBottom: 12,
};

const toolbarStyle = {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: 8,
    border: "1px solid #ddd",
    borderRadius: 6,
    marginBottom: 6,
    background: "#fafafa",
};

const editorContainerStyle = {
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "12px 14px",
    minHeight: 220,
    background: "#fff",
    lineHeight: 1.6,
};
