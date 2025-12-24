

// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import Home from "./components/Home";
// import AuthForm from "./components/AuthForm";
// import Dashboard from "./components/Dashboard";

// export default function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       <NavBar user={user} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {!user && (
//           <Route path="/auth" element={<AuthForm setUser={setUser} />} />
//         )}
//         {user && (
//           <Route
//             path="/dashboard"
//             element={<Dashboard user={user} setUser={setUser} />}
//           />
//         )}
//       </Routes>
//     </Router>
//   );
// }


import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth route */}
        <Route
          path="/auth"
          element={!user ? <AuthForm setUser={setUser} /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/auth" />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
