import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context.jsx";

export default function AdminRoute({ children }) {
    const { user } = useContext(UserContext);
    if (!user) return <Navigate to="/auth" replace />;
    if (user.role !== "admin") return <Navigate to="/" replace />;
    return children;
}
