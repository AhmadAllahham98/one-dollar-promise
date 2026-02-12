import { supabase } from "../lib/supabase";

export const PAYMENT_RESULTS = {
  SUCCESS: "success",
  CANCEL: "cancel",
  FAILURE: "failure",
};

export const PAYMENT_CONTENT = {
  [PAYMENT_RESULTS.SUCCESS]: {
    title: "Awesome.",
    message: "You're good to go. Keep it up!",
  },
  [PAYMENT_RESULTS.FAILURE]: {
    title: "That’s okay.",
    message: "Redirecting you to pay your pledge...",
  },
  [PAYMENT_RESULTS.CANCEL]: {
    title: "Payment Cancelled",
    message: "Taking you back to your promise...",
  },
  pledgePaid: {
    title: "Pledge Paid",
    message:
      "Your contribution helps support families in Gaza. You'll receive monthly updates in your inbox.",
  },
};

/**
 * Gets the display content for a given payment result
 * @param {string} result
 * @param {boolean} isFinalOutcome - If true, returns "Pledge Paid" for success instead of "Awesome"
 */
export const getPaymentContent = (result, isFinalOutcome = false) => {
  if (result === PAYMENT_RESULTS.SUCCESS && isFinalOutcome) {
    return PAYMENT_CONTENT.pledgePaid;
  }
  return PAYMENT_CONTENT[result] || PAYMENT_CONTENT[PAYMENT_RESULTS.SUCCESS];
};

/**
 * Initiates a Stripe checkout session by calling the Supabase Edge Function
 */
export const initiateStripeCheckout = async (userId, promiseId) => {
  if (!userId) throw new Error("User ID is required for checkout");

  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: {
      priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
      userId,
      promiseId,
    },
  });

  if (error) {
    // Attempt to extract the custom error message we sent from the Edge Function
    let customMsg = error.message;
    try {
      if (error.context && typeof error.context.json === "function") {
        const body = await error.context.json();
        customMsg = body.error || customMsg;
      }
    } catch (e) {
      console.error("Could not parse error body:", e);
    }

    throw new Error(customMsg || "Unknown checkout error");
  }

  if (!data?.url) throw new Error("No checkout URL returned from server");

  return data.url;
};

/**
 * Updates a promise status to 'failed' after successful pledge payment
 */
export const markPromiseAsFailedAfterPayment = async (promiseId) => {
  if (!promiseId) return;

  const { error } = await supabase
    .from("promises")
    .update({ status: "failed" })
    .eq("id", promiseId);

  if (error) throw error;
};
