import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "./components/Pages/LandingPage";
import { DashboardPage } from "./components/Pages/DashboardPage";
import { PromiseStatusPage } from "./components/Pages/PromiseStatusPage";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import "./index.css";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/promise-status" element={<PromiseStatusPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="animate-breath relative min-h-screen flex flex-col">
        <Header />
        <div className="relative z-10 flex-1 flex flex-col">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
