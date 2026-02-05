import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";
import { CTACard } from "../organisms/CTACard";

export const LandingPage = () => {
  return (
    <MainTemplate className="animate-breath">
      <UserPromiseDisplay
        safeWidthPx={840}
        maxReachPx={800}
        minReachPy={160}
        maxReachPy={800}
      />
      <CTACard />
    </MainTemplate>
  );
};
