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
import { LoadingPage } from "./components/Pages/LoadingPage";
import { UserPromiseDisplay } from "./components/organisms/UserPromiseDisplay";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import "./index.css";

const AnimatedRoutes = ({
  onLogin,
  onSignup,
  user,
  activePromise,
  loading,
  onPromiseCreated,
}) => {
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <LandingPage
              activePromise={activePromise}
              user={user}
              onPromiseCreated={onPromiseCreated}
            />
          }
        />
        <Route
          path="/signin"
          element={<SignInPage onLogin={onLogin} onSignup={onSignup} />}
        />
        <Route
          path="/promise-status"
          element={
            user ? (
              activePromise ? (
                <PromiseStatusPage promiseData={activePromise} />
              ) : (
                <LandingPage
                  activePromise={activePromise}
                  user={user}
                  onPromiseCreated={onPromiseCreated}
                />
              )
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
  activePromise,
  loading,
  handleEmailLogin,
  handleEmailSignup,
  handleLogout,
  handleLogoClick,
  navigateToSignIn,
  onPromiseCreated,
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
        onSignIn={navigateToSignIn}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatedRoutes
          onLogin={handleEmailLogin}
          onSignup={handleEmailSignup}
          user={user}
          activePromise={activePromise}
          loading={loading}
          onPromiseCreated={onPromiseCreated}
        />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [activePromise, setActivePromise] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchActivePromise = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("promises")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      setActivePromise(data && data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching promise:", error.message);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setUser(user);
      if (user) {
        fetchActivePromise(user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUser(user);
      if (user) {
        fetchActivePromise(user.id);
      } else {
        setActivePromise(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <AppWrapper
        user={user}
        activePromise={activePromise}
        loading={loading}
        refreshPromise={() => user && fetchActivePromise(user.id)}
      />
    </Router>
  );
}

// Wrapper to handle navigation on state changes
const AppWrapper = ({ user, activePromise, loading, refreshPromise }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const handleAuthSuccess = async (userId) => {
    // 1. Check if user ALREADY has an active promise in the DB
    const { data: existingPromises } = await supabase
      .from("promises")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .limit(1);

    const hasExistingPromise = existingPromises && existingPromises.length > 0;

    // 2. Check for pending promise in session storage
    const pendingPromise = sessionStorage.getItem("pendingPromise");

    if (hasExistingPromise) {
      // If they already have an active promise, DISCARD any pending one from the front end
      if (pendingPromise) {
        console.log(
          "Discarding pending promise because an active one exists in DB.",
        );
        sessionStorage.removeItem("pendingPromise");
      }
      await refreshPromise();
      navigate("/promise-status");
    } else if (pendingPromise) {
      // Only save pending promise if they DON'T have an active one
      try {
        const { error } = await supabase.from("promises").insert([
          {
            content: pendingPromise,
            user_id: userId,
            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: "active",
          },
        ]);
        if (error) throw error;
        sessionStorage.removeItem("pendingPromise");
        await refreshPromise();
        navigate("/promise-status");
      } catch (error) {
        console.error("Error saving pending promise:", error.message);
        navigate("/");
      }
    } else {
      // Normal flow: No existing, No pending
      navigate("/");
    }
  };

  const handleEmailLogin = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        await handleAuthSuccess(data.user.id);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleEmailSignup = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        // If user is immediately signed in (e.g., no email confirmation required)
        await handleAuthSuccess(data.user.id);
      } else {
        // If email confirmation is required
        alert("Check your email for the confirmation link!");
        navigate("/");
      }
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
      activePromise={activePromise}
      loading={loading}
      handleEmailLogin={handleEmailLogin}
      handleEmailSignup={handleEmailSignup}
      handleLogout={handleLogout}
      handleLogoClick={handleLogoClick}
      navigateToSignIn={navigateToSignIn}
      onPromiseCreated={refreshPromise}
    />
  );
};

export default App;
