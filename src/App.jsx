import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";
import { LandingPage } from "./components/Pages/LandingPage";
import { SignInPage } from "./components/Pages/SigninPage";
import { PromiseResultPage } from "./components/Pages/PromiseResultPage";
import { PromiseStatusPage } from "./components/Pages/PromiseStatusPage";
import { UserPromiseDisplay } from "./components/organisms/UserPromiseDisplay";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import "./index.css";

const AnimatedRoutes = ({ onLogin, onSignup, user }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={<SignInPage onLogin={onLogin} onSignup={onSignup} />}
        />
        <Route
          path="/promise-status"
          element={
            user ? (
              <PromiseStatusPage />
            ) : (
              <SignInPage onLogin={onLogin} onSignup={onSignup} />
            )
          }
        />
        <Route
          path="/promise-result"
          element={
            user ? (
              <PromiseResultPage />
            ) : (
              <SignInPage onLogin={onLogin} onSignup={onSignup} />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Sub-component to access hooks inside Router
const AppContent = ({
  user,
  handleLogin,
  handleSignup,
  handleLogout,
  handleLogoClick,
}) => {
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

      <Header
        user={user}
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatedRoutes
          onLogin={handleLogin}
          onSignup={handleSignup}
          user={user}
        />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <AppWrapper user={user} setUser={setUser} />
    </Router>
  );
}

// Wrapper to handle navigation on state changes
const AppWrapper = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleSignup = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("Check your email for the confirmation link!");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <AppContent
      user={user}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      handleLogoClick={handleLogoClick}
    />
  );
};

export default App;
