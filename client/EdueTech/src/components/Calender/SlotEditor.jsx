const colors = [
    "#bfdbfe", 
    "#bbf7d0", 
    "#fde68a", 
    "#e9d5ff",  
    "#fecaca", 
];

const SlotEditor = ({ onSave, onClose }) => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-64">
            <h3 className="text-lg font-semibold mb-4">Choose slot color</h3>

            <div className="flex gap-3 mb-6">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => onSave(color)}
                        style={{ backgroundColor: color }}
                        className="w-8 h-8 rounded-full border hover:scale-110 transition"
                    />
                ))}
            </div>

            <button
                onClick={onClose}
                className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
                Cancel
            </button>
        </div>
    );
};

export default SlotEditor;
