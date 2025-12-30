import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { UserContext } from "../context/context";


const socket = io("http://localhost:8000"); // Connect once


const Notifications = () => {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        console.log("Attempting to join room:", user.id);        socket.emit("join", user.id);

        const handleNotification = (data) => {
            // Use functional update to ensure you have the latest state
            setNotifications((prev) => [data, ...prev]);
        };

        socket.on("notification", handleNotification);

        // Optional: Handle connection errors
        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });

        return () => {
            socket.off("notification", handleNotification);
            socket.emit("leave", user.id); // Good practice to leave rooms on unmount
        };
    }, [user?.id]);

    console.log(notifications);


    return (
        <div style={{ margin: "20px" }}>
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
