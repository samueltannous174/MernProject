import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); 

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!userId) return;

        socket.emit("join", userId);

        socket.on("notification", (data) => {
            console.log("New notification:", data);
            setNotifications((prev) => [data, ...prev]);
        });

        return () => {
            socket.off("notification");
        };
    }, [userId]);

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length === 0 && <p>No notifications yet.</p>}
            <ul>
                {notifications.map((n, index) => (
                    <li key={index}>{n.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
