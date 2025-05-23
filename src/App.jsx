import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Watches from "./pages/Watches.jsx";
import "./App.css";
import WatchDetails from "./components/WatchDetails.jsx";

function App() {
  return (
    <Routes>
      {/*  /  */}
      <Route index element={<Home />} />

      {/*  /app  */}
      <Route path="app" element={<AppLayout />}>
        {/* default child = redirect to /app/watches  */}
        <Route index element={<Navigate to="watches" replace />} />

        {/* /app/watches  */}
        <Route path="watches" element={<Watches />} />
        <Route path="watches/:id" element={<WatchDetails />} />
      </Route>

      {/* catch-all – optional but handy while building */}
      <Route path="*" element={<p>404 – nothing here</p>} />
    </Routes>
  );
}

export default App;
