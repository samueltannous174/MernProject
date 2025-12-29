    import { useState, useMemo, useEffect, useContext } from "react";
    import MyCalendar from "./MyCalendar";
    import SlotEditor from "./SlotEditor";
import { UserContext } from "../../context/context";
import axios from "axios";


    const ShowCalendar = () => {
        const { user } = useContext(UserContext);
        const [view, setView] = useState("week");
        const [date, setDate] = useState(new Date());
        const [activeEvent, setActiveEvent] = useState(null);
        const [events, setEvents] = useState([]);
        const [myTopics, setMyTopics] = useState([]);
        const [enrolledTopics, setEnrolledTopics] = useState([]);
        const [loadingTopics, setLoadingTopics] = useState(true);
        useEffect(() => {
            if (!user) return;
            const fetchData = async () => {
                try {
                    const myRes = await axios.get(
                        `http://localhost:8000/userAiTopics/${user.id}`
                    );
                    const enrolledRes = await axios.get(
                        `http://localhost:8000/getTopicsForUser/${user.id}`
                    );
                    setMyTopics(myRes.data);
                    setEnrolledTopics(enrolledRes.data);
                } catch (err) {
                    console.error("Failed to load topics:", err);
                } finally {
                    setLoadingTopics(false);
                }
            };
            fetchData();
        }, [user]);
        const allTopics = [...myTopics, ...enrolledTopics];
        console.log(allTopics);
        const API_URL = "http://localhost:8000";
        const normalizeEvents = (data) =>
            data.map(ev => ({
                ...ev,
                start: new Date(ev.start),
                end: new Date(ev.end),
            }));
        const reloadEvents = async () => {
            if (!user) return;
            const res = await fetch(`${API_URL}/events/${user.id}`);
            const data = await res.json();
            setEvents(normalizeEvents(data));
        };
        useEffect(() => {
            reloadEvents();
        }, [user]);
        const mergedEvents = useMemo(() => {
            if (!events.length) return [];
            const sorted = [...events].sort(
                (a, b) => new Date(a.start) - new Date(b.start)
            );
            const merged = [];
            let current = { ...sorted[0] };
            for (let i = 1; i < sorted.length; i++) {
                const next = sorted[i];
                const currentEnd = new Date(current.end).getTime();
                const nextStart = new Date(next.start).getTime();
                if (next.title === current.title && currentEnd === nextStart) {
                    current.end = next.end;
                } else {
                    merged.push(current);
                    current = { ...next };
                }
            }
            merged.push(current);
            return merged;
        }, [events]);
        const handleSelectSlot = ({ start, end }) => {
            fetch(`${API_URL}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    title: "New Event",
                    start,
                    end,
                    color: "#bfdbfe",
                }),
            }).then(() => reloadEvents());
        };
        const handleUpdateEvent = (updated) => {
            fetch(`${API_URL}/events`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    blockStart: activeEvent.start,
                    blockEnd: activeEvent.end,
                    title: updated.title,
                    color: updated.color,
                    topicId: updated.topicId ?? null,
                }),
            }).then(() => {
                setActiveEvent(null);
                reloadEvents();
            });
        };
        const handleDeleteEvent = () => {
            fetch(`${API_URL}/events`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    eventId: activeEvent._id  
                }),
            }).then(() => {
                setActiveEvent(null);
                reloadEvents();
            });
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
                    onSelectEvent={event => setActiveEvent(event)}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: event.color,
                            borderRadius: "4px",
                            color: "black",
                            border: "1px solid rgba(0,0,0,0.1)",
                            fontWeight: "600",
                            fontSize: "12px",
                        },
                    })}
                />
                {activeEvent && (
                    <SlotEditor
                        event={activeEvent}
                        topics={allTopics}
                        onSave={handleUpdateEvent}
                        onDelete={handleDeleteEvent}
                        onClose={() => setActiveEvent(null)}
                    />
                )}
            </div>
        );
    };
    export default ShowCalendar;
