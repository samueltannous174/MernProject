import { useState, useEffect } from "react";



const colors = ["#bfdbfe", "#bbf7d0", "#fde68a", "#e9d5ff", "#fecaca"];

const SlotEditor = ({ event, topics = [], onSave, onDelete, onClose }) => {
    const [title, setTitle] = useState(event.title);
    const [color, setColor] = useState(event.color);
    const [selectedTopicId, setSelectedTopicId] = useState("");

    useEffect(() => {
        setTitle(event.title);
        setColor(event.color);

        // Prefer matching by topicId when available
        if (event.topicId) {
            const found = topics.find(t => t._id === event.topicId);
            if (found) {
                setSelectedTopicId(found._id);
                return;
            }
        }

        const fallback = topics.find(t => t.title === event.title);
        if (fallback) setSelectedTopicId(fallback._id);

    }, [event, topics]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const topic = topics.find(t => t._id === selectedTopicId);
        const finalTitle = topic ? topic.title : title;

        onSave({
            ...event,
            title: finalTitle,
            color,
            topicId: topic ? topic._id : null,
        });
    };

    const handleNavigate = () => {
        if (!selectedTopicId) return;


        const topic = topics.find(t => t._id === selectedTopicId);
        console.log(topic);

        if (!topic) return;
        if (topic.learningPath) {
            window.location.href = `/topic/${topic._id}`;
        }
        else {
            window.location.href = `/topics/${topic._id}`;
        }
    };


    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[100]">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-80 border border-gray-200">

                <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Edit Event
                </h3>

                {topics.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                            Select Topic (optional)
                        </label>

                        <select
                            value={selectedTopicId}
                            onChange={(e) => {
                                setSelectedTopicId(e.target.value);
                                const topic = topics.find(t => t._id === e.target.value);
                                if (topic) setTitle(topic.title);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">— None —</option>

                            {topics.map(t => (
                                <option key={t._id} value={t._id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                        Title
                    </label>

                    <input
                        autoFocus
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Color Picker */}
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                        Color Label
                    </label>

                    <div className="flex gap-2">
                        {colors.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setColor(c)}
                                style={{ backgroundColor: c }}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${c === color
                                        ? "border-gray-800 scale-110 shadow-md"
                                        : "border-transparent"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>

                    {selectedTopicId && (
                        <button
                            onClick={handleNavigate}
                            className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition"
                        >
                            Go To Topic
                        </button>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={onDelete}
                            className="flex-1 bg-red-50 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-100 transition"
                        >
                            Delete
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-100 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SlotEditor;
