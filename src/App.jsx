import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "./components/Pages/LandingPage";
import { SignInPage } from "./components/Pages/SignInPage";
import { PromiseStatusPage } from "./components/Pages/PromiseStatusPage";
import { UserPromiseDisplay } from "./components/organisms/UserPromiseDisplay";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import "./index.css";

const AnimatedRoutes = ({ onLogin, user }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage onLogin={onLogin} />} />
        <Route
          path="/promise-status"
          element={
            user ? <PromiseStatusPage /> : <SignInPage onLogin={onLogin} />
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Sub-component to access hooks inside Router
const AppContent = ({ user, handleLogin, handleLogout }) => {
  return (
    <div className="animate-breath relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Decorative element only visible when not logged in */}
      <div
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          user ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <UserPromiseDisplay
          safeWidthPx={840}
          maxReachPx={800}
          minReachPy={160}
          maxReachPy={800}
          className="fixed w-full h-screen"
        />
      </div>

      <Header user={user} onLogout={handleLogout} />

      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatedRoutes onLogin={handleLogin} user={user} />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppWrapper user={user} setUser={setUser} />
    </Router>
  );
}

// Wrapper to handle navigation on state changes
const AppWrapper = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser({ ...userData, name: userData.email.split("@")[0] });
    // Navigation is handled inside the page components
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/signin"); // Force navigation to trigger AnimatePresence
  };

  return (
    <AppContent
      user={user}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
    />
  );
};

export default App;
