import { Route, Routes } from "react-router";
import BG from "./assets/BG.png";
import Admin from "./pages/Admin";
import Status from "./pages/Status";
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        // backgroundImage:"radial-gradient(rgba(255, 255, 255, 0.2) 8%,transparent 8%)",
        backgroundImage: `url(${BG})`,
      }}
    >
      <Routes>
        <Route path="/" element={<Status />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
