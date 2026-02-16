import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";
import { LandingPage } from "./components/Pages/LandingPage";
import { SignInPage } from "./components/Pages/SigninPage";
import { PromiseResultPage } from "./components/Pages/PromiseResultPage";
import { PromiseStatusPage } from "./components/Pages/PromiseStatusPage";
import { PaymentResultPage } from "./components/Pages/PaymentResultPage";
import { LoadingPage } from "./components/Pages/LoadingPage";
import { EmailVerificationPage } from "./components/Pages/EmailVerificationPage";
import { UserPromiseDisplay } from "./components/organisms/UserPromiseDisplay";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import "./index.css";
import { getAuthAction, AUTH_ACTION_TYPES } from "./utils/authUtils";
import toast, { Toaster } from "react-hot-toast";

const AnimatedRoutes = ({
  onLogin,
  onSignup,
  onGoogleLogin,
  user,
  activePromise,
  loading,
  onPromiseCreated,
}) => {
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  const isEmailUnconfirmed = user && !user.email_confirmed_at;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/"
          element={
            isEmailUnconfirmed ? (
              <Navigate to="/verify-email" replace />
            ) : (
              <LandingPage
                activePromise={activePromise}
                user={user}
                onPromiseCreated={onPromiseCreated}
              />
            )
          }
        />
        <Route
          path="/signin"
          element={
            <SignInPage
              onLogin={onLogin}
              onSignup={onSignup}
              onGoogleAction={onGoogleLogin}
            />
          }
        />
        <Route
          path="/promise-status"
          element={
            user ? (
              activePromise === undefined ? (
                <LoadingPage />
              ) : activePromise ? (
                <PromiseStatusPage
                  promiseData={activePromise}
                  onActioned={onPromiseCreated}
                />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <SignInPage
                onLogin={onLogin}
                onSignup={onSignup}
                onGoogleAction={onGoogleLogin}
              />
            )
          }
        />
        <Route
          path="/promise-result"
          element={
            user ? (
              <PromiseResultPage user={user} />
            ) : (
              <SignInPage
                onLogin={onLogin}
                onSignup={onSignup}
                onGoogleAction={onGoogleLogin}
              />
            )
          }
        />
        <Route
          path="/payment-result"
          element={
            user ? (
              <PaymentResultPage onActioned={onPromiseCreated} />
            ) : (
              <SignInPage
                onLogin={onLogin}
                onSignup={onSignup}
                onGoogleAction={onGoogleLogin}
              />
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
  handleGoogleLogin,
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
          onGoogleLogin={handleGoogleLogin}
          user={user}
          activePromise={activePromise}
          loading={loading}
          onPromiseCreated={onPromiseCreated}
        />
      </div>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(37, 49, 54, 0.8)",
            color: "var(--color-white)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px",
            borderRadius: "var(--radius-lg)",
            fontFamily: "var(--font-interface)",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "var(--color-primary)",
              secondary: "var(--color-slate-900)",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "var(--color-white)",
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [activePromise, setActivePromise] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const lastFetchId = useRef(0);
  const fetchActivePromise = useCallback(async (userId) => {
    if (!userId) {
      setActivePromise(null);
      return;
    }

    const currentFetchId = ++lastFetchId.current;
    try {
      const { data, error } = await supabase
        .from("promises")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      // Only update state if this is still the most recent fetch request
      if (currentFetchId === lastFetchId.current) {
        setActivePromise(data && data.length > 0 ? data[0] : null);
      }
    } catch (error) {
      console.error("Error fetching promise:", error.message);
    }
  }, []);

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
        refreshPromise={(id) => fetchActivePromise(id || user?.id)}
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

    // 2. Check for pending promise in session storage
    const pendingPromise = sessionStorage.getItem("pendingPromise");

    // 3. Get the action based on business logic
    const action = getAuthAction(existingPromises, pendingPromise);

    if (action.type === AUTH_ACTION_TYPES.EXISTING_ACTIVE) {
      if (action.shouldDiscardPending) {
        console.log(
          "Discarding pending promise because an active one exists in DB.",
        );
        sessionStorage.removeItem("pendingPromise");
      }
      await refreshPromise(userId);
      navigate(action.navigateTo);
    } else if (action.type === AUTH_ACTION_TYPES.MIGRATE_PENDING) {
      try {
        const { error } = await supabase.from("promises").insert([
          {
            content: action.content,
            user_id: userId,
            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: "active",
          },
        ]);
        if (error) throw error;
        sessionStorage.removeItem("pendingPromise");
        await refreshPromise(userId);
        navigate(action.navigateTo);
      } catch (error) {
        console.error("Error saving pending promise:", error.message);
        navigate("/");
      }
    } else {
      navigate(action.navigateTo);
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
      toast.error(error.error_description || error.message);
    }
  };

  const handleEmailSignup = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (data.session) {
        // If user is immediately signed in (e.g., no email confirmation required)
        await handleAuthSuccess(data.user.id);
      } else if (data.user) {
        // If email confirmation is required OR if user already exists
        // In Supabase, if a user already exists and you try to sign up:
        // - and confirmation is ON: it returns the user but identities will be empty
        // - and confirmation is OFF: it usually returns an error "User already registered" (caught in catch block)
        const isExistingUser =
          data.user.identities && data.user.identities.length === 0;

        if (isExistingUser) {
          toast.error("You already have an account. Please log in instead.");
          // Stay on the sign in page as requested
        } else {
          toast.success("Check your email for the confirmation link!");
          navigate("/verify-email");
        }
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      toast.error(error.error_description || error.message);
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
      handleGoogleLogin={handleGoogleLogin}
      onPromiseCreated={refreshPromise}
    />
  );
};

export default App;
