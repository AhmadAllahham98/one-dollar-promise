import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";
import { GlassCard } from "../atoms/GlassCard";
import { useNavigate } from "react-router-dom";

export const PromiseStatusPage = () => {
  const [debugActionable, setDebugActionable] = React.useState(false);

  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/promise-result", { state: { result: "success" } });
  };

  const handleFailure = () => {
    navigate("/promise-result", { state: { result: "failure" } });
  };

  const handleToggle = () => {
    // Only allow toggling in development mode
    if (import.meta.env.DEV) {
      setDebugActionable((prev) => !prev);
    }
  };

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <PromiseDisplay
          promiseActionable={debugActionable}
          onClick={handleToggle}
          onSuccess={handleSuccess}
          onFail={handleFailure}
          className={
            import.meta.env.DEV ? "cursor-pointer transition-transform" : ""
          }
        />
      </GlassCard>
    </MainTemplate>
  );
};
