import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";
import { GlassCard } from "../atoms/GlassCard";

export const PromiseStatusPage = () => {
  const [debugActionable, setDebugActionable] = React.useState(false);

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
          className={
            import.meta.env.DEV ? "cursor-pointer transition-transform" : ""
          }
        />
      </GlassCard>
    </MainTemplate>
  );
};
