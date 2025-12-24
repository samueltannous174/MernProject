import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const events = [
    {
        title: "Team Meeting",
        start: new Date(2025, 11, 24, 10, 0),
        end: new Date(2025, 11, 24, 11, 0),
    },
    {
        title: "Lunch",
        start: new Date(2025, 11, 25, 13, 0),
        end: new Date(2025, 11, 25, 14, 0),
    },
];


const MyCalendar = (props) => {
    return (
        <div style={{ height: "600px" }}>
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"   
                {...props}
            />
        </div>
    );
};

export default MyCalendar;
