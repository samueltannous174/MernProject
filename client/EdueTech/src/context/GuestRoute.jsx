import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/context.jsx";

export default function GuestRoute({ children }) {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
