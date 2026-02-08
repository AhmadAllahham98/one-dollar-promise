import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseForm } from "../organisms/PromiseForm";
import { GlassCard } from "../atoms/GlassCard";
import StarIcon from "../../assets/StarIcon.svg";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handlePromiseSubmit = () => {
    // For now, any auth action redirects to the signin
    navigate("/signin");
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
