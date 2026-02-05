import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";
import { CTACard } from "../organisms/CTACard";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    // For now, any auth action redirects to the dashboard
    navigate("/dashboard");
  };

  return (
    <MainTemplate className="animate-breath" alignment="top">
      <UserPromiseDisplay
        safeWidthPx={840}
        maxReachPx={800}
        minReachPy={160}
        maxReachPy={800}
      />

      <CTACard onAuthAction={handleAuthAction} />
    </MainTemplate>
  );
};
