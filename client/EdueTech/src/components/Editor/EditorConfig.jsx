import { memo } from "react";

export const styleMap = {
    RED: { color: "red" },
    BLUE: { color: "#2563eb" },
    GREEN: { color: "#15803d" },
    ORANGE: { color: "#ea580c" },
    FS_14: { fontSize: "14px" },
    FS_18: { fontSize: "18px" },
    FS_24: { fontSize: "24px" },
    FS_32: { fontSize: "32px" },
};

export const Media = memo(({ block, contentState }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    if (type === "image") {
        return <img src={src} alt="" style={{ maxWidth: "100%", borderRadius: 10, display: 'block', margin: '10px 0' }} />;
    }
    if (type === "video") {
        return <video src={src} controls style={{ maxWidth: "100%", borderRadius: 10, display: 'block', margin: '10px 0' }} />;
    }
    return null;
});

export const blockRendererFn = (block) => {
    if (block.getType() === "atomic") {
        return { component: Media, editable: false };
    }
    return null;
};