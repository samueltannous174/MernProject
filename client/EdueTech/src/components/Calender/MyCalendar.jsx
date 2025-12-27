import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NavBar from "../components/NavBar";


const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
    return (
        <div style={{ height: "100%" }}>
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