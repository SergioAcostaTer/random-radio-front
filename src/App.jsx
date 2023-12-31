import { Routes, Route, Navigate } from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/room1" replace />} />
      <Route path="/:room" element={<Room />} />
      <Route path="*" element={<Navigate to="/room1" replace />} />
    </Routes>
  );
}

export default App;
