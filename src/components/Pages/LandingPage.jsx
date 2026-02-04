import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";

export const LandingPage = () => {
  const responsiveTitleStyle = "font-display-md md:font-display-lg";
  const responsiveSubtitleStyle = "font-interface-md md:font-interface-lg";
  return (
    <MainTemplate className="min-h-screen animate-breath">
      <div className="flex flex-col items-center justify-center gap-y-md md:gap-y-lg max-w-[343px] md:max-w-[684px] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6">
        <h1 className={`text-center ${responsiveTitleStyle}`}>
          Promises that stick<span className="font-bold text-accent">.</span>
        </h1>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
        <div className="flex flex-col items-center justify-center gap-y-xsm md:gap-y-md">
          <p className={`font-light text-center ${responsiveSubtitleStyle}`}>
            The easiest way to start{" "}
            <span className="font-bold text-accent">keeping</span> promises.
          </p>
          <p className={`font-light text-center ${responsiveSubtitleStyle}`}>
            Make a <span className="font-bold text-accent">$1</span> promise.
            Keep it. Get your dollar back.
          </p>
        </div>
        <SignUpAuthForm />
      </div>
      <UserPromiseDisplay />
    </MainTemplate>
  );
};
