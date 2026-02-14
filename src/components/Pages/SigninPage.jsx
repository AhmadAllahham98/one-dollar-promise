import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";

export const SignInPage = ({ onLogin, onSignup, onGoogleAction }) => {
  const navigate = useNavigate();

  const handleSignIn = async (credentials) => {
    if (onLogin) {
      await onLogin(credentials);
    }
  };

  const handleSignUp = async (credentials) => {
    if (onSignup) {
      await onSignup(credentials);
    }
  };

  return (
    <MainTemplate alignment="top">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <SignUpAuthForm
          onLogin={handleSignIn}
          onSignup={handleSignUp}
          onGoogleAction={onGoogleAction}
        />
      </GlassCard>
    </MainTemplate>
  );
};
