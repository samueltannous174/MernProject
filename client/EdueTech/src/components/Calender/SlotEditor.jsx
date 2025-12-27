import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";



const colors = ["#bfdbfe", "#bbf7d0", "#fde68a", "#e9d5ff", "#fecaca"];

const SlotEditor = ({ event, onSave, onDelete, onClose }) => {
    const [title, setTitle] = useState(event.title);
    const [color, setColor] = useState(event.color);

     useEffect(() => {
        setTitle(event.title);
        setColor(event.color);
    }, [event]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...event, title, color });
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[100]">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-80 border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Edit Event</h3>

                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title</label>
                    <input
                        autoFocus
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Color Label</label>
                    <div className="flex gap-2">
                        {colors.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setColor(c)}
                                style={{ backgroundColor: c }}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${c === color ? "border-gray-800 scale-110 shadow-md" : "border-transparent"
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