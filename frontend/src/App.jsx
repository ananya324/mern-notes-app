import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/notes" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/notes" />} />
      <Route path="/notes" element={user ? <Notes /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
