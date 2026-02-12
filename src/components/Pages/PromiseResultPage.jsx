import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { TextMessage } from "../organisms/TextMessage";
import {
  getPaymentContent,
  initiateStripeCheckout,
  PAYMENT_RESULTS,
} from "../../utils/stripeUtils";

export const PromiseResultPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Priority: 1. URL search params (from Stripe) 2. React Router state (from internal navigation)
  const result =
    searchParams.get("result") ||
    location.state?.result ||
    PAYMENT_RESULTS.SUCCESS;

  const { title, message } = getPaymentContent(result);

  useEffect(() => {
    if (result === PAYMENT_RESULTS.FAILURE) {
      const handlePayment = async () => {
        try {
          const checkoutUrl = await initiateStripeCheckout(
            user?.id,
            location.state?.promiseId,
          );
          window.location.href = checkoutUrl;
        } catch (error) {
          console.error("Payment initiation failed:", error.message);
          alert(
            "Failed to initiate payment. Please try again or contact support.",
          );
          navigate("/");
        }
      };

      handlePayment();
    } else {
      // Success case - redirect home after 3 seconds
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result, navigate, user, location.state?.promiseId]);

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
