import { useState } from "react";
import MyCalendar from "./MyCalendar";
import SlotEditor from "./SlotEditor";

const ShowCalendar = () => {
    const [view, setView] = useState("week");
    const [date, setDate] = useState(new Date());

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Team Meeting",
            start: new Date(2025, 11, 24, 10, 0),
            end: new Date(2025, 11, 24, 11, 0),
            color: "#3b82f6", 
        },
    ]);

    const [activeEvent, setActiveEvent] = useState(null);

    const handleSelectSlot = ({ start, end }) => {
        const newEvent = {
            id: Date.now(),
            title: "New Event",
            start,
            end,
            color: "#bfdbfe",
        };
        setEvents((prev) => [...prev, newEvent]);
    };

    const handleSelectEvent = (event) => {
        setActiveEvent(event);
    };

    const updateEventColor = (color) => {
        setEvents((prev) =>
            prev.map((ev) =>
                ev.id === activeEvent.id ? { ...ev, color } : ev
            )
        );
        setActiveEvent(null);
    };

    return (
        <div className="relative h-[600px]">
            <MyCalendar
                events={events}
                views={{ month: true, week: true, day: true }}
                view={view}
                style={{ height: "900px", padding: "30px"    }}
                onView={setView}
                date={date}
                onNavigate={setDate}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                        borderRadius: "6px",
                        color: "#1b1414ff",
                        border: "none",
                        fontWeight: "bold",
                    },
                })}
            />

            {activeEvent && (
                <SlotEditor
                    onSave={updateEventColor}
                    onClose={() => setActiveEvent(null)}
                />
            )}
        </div>
    );
};

export default ShowCalendar;
