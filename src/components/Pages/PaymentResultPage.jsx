import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { TextMessage } from "../organisms/TextMessage";
import {
  getPaymentContent,
  markPromiseAsFailedAfterPayment,
  PAYMENT_RESULTS,
} from "../../utils/stripeUtils";

export const PaymentResultPage = ({ onActioned }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(false);

  const result = searchParams.get("result"); // 'success' or 'cancel'
  const promiseId = searchParams.get("promiseId");

  const { title, message } = getPaymentContent(result, true);

  useEffect(() => {
    if (result === PAYMENT_RESULTS.SUCCESS && promiseId) {
      const handleSuccess = async () => {
        setIsUpdating(true);
        try {
          await markPromiseAsFailedAfterPayment(promiseId);
          if (onActioned) {
            onActioned();
          }
        } catch (error) {
          console.error("Error updating promise after payment:", error.message);
        } finally {
          setIsUpdating(false);
        }
      };

      handleSuccess();

      const timer = setTimeout(() => {
        navigate("/");
      }, 4000); // 4 seconds so they can read the text
      return () => clearTimeout(timer);
    } else if (result === PAYMENT_RESULTS.CANCEL) {
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
