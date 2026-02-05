import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/Pages/LandingPage";
import { DashboardPage } from "./components/Pages/DashboardPage";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
