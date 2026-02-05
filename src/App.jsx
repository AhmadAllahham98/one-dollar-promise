import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/Pages/LandingPage";
import { DashboardPage } from "./components/Pages/DashboardPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="animate-breath relative min-h-screen">
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
