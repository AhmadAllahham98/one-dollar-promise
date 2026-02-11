import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { TextMessage } from "../organisms/TextMessage";

export const PromiseResultPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Priority: 1. URL search params (from Stripe) 2. React Router state (from internal navigation)
  const result =
    searchParams.get("result") || location.state?.result || "success";

  const content = {
    success: {
      title: "Awesome.",
      message: "You're good to go. Keep it up!",
    },
    failure: {
      title: "That’s okay.",
      message: "Redirecting you to pay your pledge...",
    },
  };

  const { title, message } = content[result] || content.success;

  useEffect(() => {
    if (result === "failure") {
      const handlePayment = async () => {
        try {
          // Call Supabase Edge Function to create Checkout Session
          const { data, error } = await supabase.functions.invoke(
            "create-checkout",
            {
              body: {
                priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
                userId: user?.id,
              },
            },
          );

          if (error) throw error;

          if (data?.url) {
            window.location.href = data.url;
          } else {
            throw new Error(data?.error || "No checkout URL returned");
          }
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
  }, [result, navigate, user]);

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
