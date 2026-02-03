import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";

export const LandingPage = () => {
  const titleStyle = "font-display-md md:font-display-lg";
  const subtitleStyle =
    "font-light text-center font-interface-md md:font-interface-lg";
  return (
    <MainTemplate className="min-h-screen animate-breath">
      <div className="flex flex-col items-center justify-center gap-y-md md:gap-y-lg max-w-[343px] md:max-w-[684px]">
        <h1 className={titleStyle}>Promises that stick.</h1>
        <div className="w-full h-[1px] bg-surface-200" />
        <p className={subtitleStyle}>
          Make a <span className="font-bold text-accent">$1</span> promise. Keep
          it. Get your dollar back.
          <br />
          All pledges paid go to supporting{" "}
          <span className="font-bold text-accent">Gaza</span>.
        </p>
        <SignUpAuthForm />
      </div>
      <UserPromiseDisplay />
    </MainTemplate>
  );
};
