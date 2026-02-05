import React from "react";
import PropTypes from "prop-types";
import { SignUpAuthForm } from "./SignUpAuthForm";
import { GlassCard } from "../atoms/GlassCard";
import StarIcon from "../../assets/StarIcon.svg";

const RESPONSIVE_TITLE_STYLE = "font-display-md md:font-display-lg";
const RESPONSIVE_SUBTITLE_STYLE = "font-interface-md md:font-interface-lg";

/**
 * CTA Card organism used on the landing page.
 * Uses GlassCard atom for the premium spotlight effect and glassmorphic styling.
 */
export const CTACard = ({ onAuthAction, className = "" }) => {
  return (
    <GlassCard
      as="section"
      className={`max-w-[343px] md:max-w-[684px] p-md md:p-lg ${className}`}
      containerClassName="flex flex-col items-center justify-center gap-y-md md:gap-y-lg w-full"
    >
      <h1 className={`text-center ${RESPONSIVE_TITLE_STYLE}`}>
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
      <div className="flex flex-col items-center justify-center gap-y-xsm md:gap-y-md">
        <p className={`font-light text-center ${RESPONSIVE_SUBTITLE_STYLE}`}>
          The easiest way to start{" "}
          <span className="font-bold text-accent">keeping</span> promises.
        </p>
        <p className={`font-light text-center ${RESPONSIVE_SUBTITLE_STYLE}`}>
          Make a <span className="font-bold text-accent">$1</span> promise. Keep
          it. Get your dollar back.
        </p>
      </div>

      {/* Auth Form Registration */}
      <SignUpAuthForm onLogin={onAuthAction} onSignup={onAuthAction} />
    </GlassCard>
  );
};

CTACard.propTypes = {
  /** Callback for auth actions */
  onAuthAction: PropTypes.func,
  /** Optional additional classes */
  className: PropTypes.string,
};
