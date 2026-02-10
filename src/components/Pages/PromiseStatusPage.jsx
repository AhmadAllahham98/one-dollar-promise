import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";
import { GlassCard } from "../atoms/GlassCard";
import { useNavigate } from "react-router-dom";

export const PromiseStatusPage = ({ promiseData }) => {
  const [isActionable, setIsActionable] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (promiseData?.created_at) {
      const createdDate = new Date(promiseData.created_at);
      const today = new Date();

      // Zero out times to compare just the date
      const createdZero = new Date(
        createdDate.getFullYear(),
        createdDate.getMonth(),
        createdDate.getDate(),
      );
      const todayZero = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      // If today is at least 1 day after created date
      setIsActionable(todayZero > createdZero);
    }
  }, [promiseData]);

  const handleSuccess = () => {
    navigate("/promise-result", { state: { result: "success" } });
  };

  const handleFailure = () => {
    navigate("/promise-result", { state: { result: "failure" } });
  };

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <PromiseDisplay
          promise={promiseData?.content || "No promise found."}
          promiseActionable={isActionable}
          onSuccess={handleSuccess}
          onFail={handleFailure}
        />
      </GlassCard>
    </MainTemplate>
  );
};
