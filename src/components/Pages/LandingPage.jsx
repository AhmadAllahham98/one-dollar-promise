import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseForm } from "../organisms/PromiseForm";
import { GlassCard } from "../atoms/GlassCard";
import StarIcon from "../../assets/StarIcon.svg";

import { supabase } from "../../lib/supabase";

export const LandingPage = ({ activePromise, user, onPromiseCreated }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activePromise && window.location.pathname !== "/promise-status") {
      navigate("/promise-status");
    }
  }, [activePromise, navigate]);

  const handlePromiseSubmit = async (promiseContent) => {
    if (!promiseContent.trim() || submitting) return;

    setSubmitting(true);
    if (user) {
      try {
        const { error } = await supabase.from("promises").insert([
          {
            content: promiseContent,
            user_id: user.id,
            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: "active",
          },
        ]);

        if (error) throw error;
        if (onPromiseCreated) await onPromiseCreated();
        navigate("/promise-status");
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      // Save to session storage and go to signin
      sessionStorage.setItem("pendingPromise", promiseContent);
      navigate("/signin", { state: { fromPromise: true } });
      setSubmitting(false);
    }
  };

  return (
    <MainTemplate alignment="top">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <h1 className="page-title">
          Promises that st
          <span className="relative inline-flex items-center">
            ı
            <img
              src={StarIcon}
              className="absolute -top-[-0.1em] left-1/2 -translate-x-1/2 w-[0.32em] h-[0.32em] max-w-none"
              alt=""
            />
          </span>
          ck
        </h1>

        {/* Separator Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />

        {/* Subtitles */}
        <div className="flex flex-col items-center justify-center gap-y-xsm">
          <p className="page-subtitle">
            The easiest way to start{" "}
            <span className="font-bold text-accent">keeping</span> promises.
          </p>
          <p className="page-subtitle">
            Make a <span className="font-bold text-accent">$1</span> promise.
            Keep it. Get your dollar back.
          </p>
          <p className="page-subtitle">
            What's your <span className="font-bold text-accent">promise</span>{" "}
            for today?
          </p>
        </div>

        <PromiseForm onPromiseSubmit={handlePromiseSubmit} />
      </GlassCard>
    </MainTemplate>
  );
};
