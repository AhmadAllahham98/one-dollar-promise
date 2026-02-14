import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { Button } from "../atoms/Button";
import { GlassCard } from "../atoms/GlassCard";

export const EmailVerificationPage = () => {
  const navigate = useNavigate();

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <div className="flex flex-col items-center w-full section-gap">
          <span className="font-display-sm md:font-display-md w-full text-center text-content-base">
            Check Your Email
          </span>
          <div className="w-full h-[1px] bg-surface-200" />
          <div className="form-width flex flex-col items-center text-center gap-y-lg">
            <p className="font-interface-md text-content-base/80">
              We've sent a confirmation link to your email address. Please
              verify your email to activate your promise.
            </p>
            <Button
              label="Back to Login"
              style="outline"
              className="w-full"
              onClick={() => navigate("/signin")}
            />
          </div>
        </div>
      </GlassCard>
    </MainTemplate>
  );
};
