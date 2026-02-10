import React from "react";
import { supabase } from "../../lib/supabase";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";
import { GlassCard } from "../atoms/GlassCard";
import { useNavigate } from "react-router-dom";

export const PromiseStatusPage = ({ promiseData, onActioned }) => {
  const [isActionable, setIsActionable] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
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
      // setIsActionable(todayZero > createdZero);
      setIsActionable(true);
    }
  }, [promiseData]);

  const actionPromise = async (status) => {
    if (!promiseData?.id || isUpdating) return;

    setIsUpdating(true);
    try {
      const dbStatus = status === "success" ? "completed" : "failed";
      const { error } = await supabase
        .from("promises")
        .update({ status: dbStatus })
        .eq("id", promiseData.id);

      if (error) throw error;

      // Navigate first so AnimatePresence captures the current state of the page
      navigate("/promise-result", { state: { result: status } });

      // Then refresh the active promise state
      if (onActioned) {
        onActioned();
      }
    } catch (error) {
      console.error(
        `Error updating promise status to ${status}:`,
        error.message,
      );
      alert("Failed to update promise. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSuccess = () => actionPromise("success");
  const handleFailure = () => actionPromise("failure");

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
