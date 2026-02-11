import React from "react";
import { supabase } from "../../lib/supabase";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";
import { GlassCard } from "../atoms/GlassCard";
import { useNavigate } from "react-router-dom";
import { isPromiseActionable } from "../../utils/promiseUtils";

export const PromiseStatusPage = ({ promiseData, onActioned }) => {
  const [isActionable, setIsActionable] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsActionable(isPromiseActionable(promiseData?.created_at));
  }, [promiseData]);

  const actionPromise = async (status) => {
    if (!promiseData?.id || isUpdating) return;

    if (status === "success") {
      setIsUpdating(true);
      try {
        const { error } = await supabase
          .from("promises")
          .update({ status: "completed" })
          .eq("id", promiseData.id);

        if (error) throw error;

        // Navigate first for animation
        navigate("/promise-result", { state: { result: status } });

        if (onActioned) {
          onActioned();
        }
      } catch (error) {
        console.error("Error updating promise status:", error.message);
        alert("Failed to update promise. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    } else {
      // For failure, we DON'T update the DB yet.
      // We go to the result page which will trigger the Stripe redirect.
      navigate("/promise-result", {
        state: {
          result: "failure",
          promiseId: promiseData.id,
        },
      });
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
