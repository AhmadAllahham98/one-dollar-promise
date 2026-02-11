import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { TextMessage } from "../organisms/TextMessage";

export const PaymentResultPage = ({ onActioned }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(false);

  const result = searchParams.get("result"); // 'success' or 'cancel'
  const promiseId = searchParams.get("promiseId");

  const content = {
    success: {
      title: "Pledge Paid",
      message:
        "Your contribution helps support families in Gaza. You'll receive monthly updates in your inbox.",
    },
    cancel: {
      title: "Payment Cancelled",
      message: "Taking you back to your promise...",
    },
  };

  const { title, message } = content[result] || content.success;

  useEffect(() => {
    if (result === "success" && promiseId) {
      const markAsFailed = async () => {
        setIsUpdating(true);
        try {
          const { error } = await supabase
            .from("promises")
            .update({ status: "failed" })
            .eq("id", promiseId);

          if (error) throw error;

          if (onActioned) {
            onActioned();
          }
        } catch (error) {
          console.error("Error updating promise after payment:", error.message);
        } finally {
          setIsUpdating(false);
        }
      };

      markAsFailed();

      const timer = setTimeout(() => {
        navigate("/");
      }, 4000); // 4 seconds so they can read the text
      return () => clearTimeout(timer);
    } else if (result === "cancel") {
      // If cancelled, go back to the status page immediately
      const timer = setTimeout(() => {
        navigate("/promise-status");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Fallback
      navigate("/");
    }
  }, [result, promiseId, navigate, onActioned]);

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <TextMessage title={title} message={message} />
      </GlassCard>
    </MainTemplate>
  );
};
