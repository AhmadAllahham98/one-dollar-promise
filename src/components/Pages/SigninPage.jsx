import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";

export const SignInPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSignIn = (credentials) => {
    // Call the login handler passed from App.jsx
    if (onLogin) {
      onLogin(credentials);
    }
    // Navigate to the status page after sign in
    navigate("/promise-status");
  };

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <SignUpAuthForm onLogin={handleSignIn} />
      </GlassCard>
    </MainTemplate>
  );
};
