import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { Header } from "../organisms/Header";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";

export const LandingPage = () => {
  const titleStyle = "font-display-md md:font-display-lg";
  const subtitleStyle =
    "font-light text-center font-interface-md md:font-interface-lg";
  return (
    <MainTemplate>
      <div className="flex flex-col items-center justify-center gap-y-md md:gap-y-lg max-w-[343px] md:max-w-[684px]">
        <h1 className={titleStyle}>Promises that stick.</h1>
        <div className="w-full h-[1px] bg-surface-200" />
        <p className={subtitleStyle}>
          Join thousands of people making $1 promises to improve their lives.
          <br />
          All pledges paid go to supporting the people of Gaza.
        </p>
        <SignUpAuthForm />
      </div>
      <UserPromiseDisplay />
    </MainTemplate>
  );
};
