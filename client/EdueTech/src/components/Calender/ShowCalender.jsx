import { useState, useMemo } from "react";
import MyCalendar from "./MyCalendar";
import SlotEditor from "./SlotEditor";

const ShowCalendar = () => {
    const [view, setView] = useState("week");
    const [date, setDate] = useState(new Date());
    const [activeEvent, setActiveEvent] = useState(null);

    // Initial State
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Team Meeting",
            start: new Date(2025, 11, 24, 10, 0),
            end: new Date(2025, 11, 24, 11, 0),
            color: "#3b82f6",
        },
    ]);

    // --- ROBUST MERGE LOGIC ---
    const mergedEvents = useMemo(() => {
        if (events.length === 0) return [];
        const sorted = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

        const merged = [];
        let current = { ...sorted[0] };

        for (let i = 1; i < sorted.length; i++) {
            const next = sorted[i];
            const currentEnd = new Date(current.end).getTime();
            const nextStart = new Date(next.start).getTime();

            if (next.title === current.title && currentEnd === nextStart) {
                current.end = next.end; // Extend
            } else {
                merged.push(current);
                current = { ...next };
            }
        }
        merged.push(current);
        return merged;
    }, [events]);

    const handleSelectSlot = ({ start, end }) => {
        const newEvent = {
            id: Date.now() + Math.random(),
            title: "New Event",
            start,
            end,
            color: "#bfdbfe",
        };
        setEvents((prev) => [...prev, newEvent]);
    };

    const handleUpdateEvent = (updatedEvent) => {
        setEvents(prev => prev.map(ev => {
            // Find the segment that belongs to the merged block we just edited
            // We check if the segment falls within the time range of the block we clicked
            const isPartOfEditedBlock =
                new Date(ev.start) >= new Date(activeEvent.start) &&
                new Date(ev.end) <= new Date(activeEvent.end) &&
                ev.title === activeEvent.title;

            if (isPartOfEditedBlock) {
                return { ...ev, title: updatedEvent.title, color: updatedEvent.color };
            }
            return ev;
        }));
        setActiveEvent(null);
    };

    const handleDeleteEvent = () => {
        setEvents(prev => prev.filter(ev => {
            // Remove all segments that match the merged block's criteria
            const isPartOfDeletedBlock =
                new Date(ev.start) >= new Date(activeEvent.start) &&
                new Date(ev.end) <= new Date(activeEvent.end) &&
                ev.title === activeEvent.title;

            return !isPartOfDeletedBlock;
        }));
        setActiveEvent(null);
    };

    return (
        <div className="relative h-[900px] w-full bg-white">
            <MyCalendar
                events={mergedEvents}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => setActiveEvent(event)}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                        borderRadius: "4px",
                        color: "black",
                        border: "1px solid rgba(0,0,0,0.1)",
                        fontWeight: "600",
                        fontSize: "12px"
                    },
                })}
            />

            {activeEvent && (
                <SlotEditor
                    event={activeEvent}
                    onSave={handleUpdateEvent}
                    onDelete={handleDeleteEvent}
                    onClose={() => setActiveEvent(null)}
                />
            )}
        </div>
    );
};

export default ShowCalendar;