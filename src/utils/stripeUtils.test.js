import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getPaymentContent,
  initiateStripeCheckout,
  PAYMENT_RESULTS,
} from "./stripeUtils";
import { supabase } from "../lib/supabase";

// Mock Supabase
vi.mock("../lib/supabase", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  },
}));

// Mock Vite env
vi.stubEnv("VITE_STRIPE_PRICE_ID", "test_price_id");

describe("stripeUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPaymentContent", () => {
    it("should return correct content for success", () => {
      const content = getPaymentContent(PAYMENT_RESULTS.SUCCESS);
      expect(content.title).toBe("Awesome.");
    });

    it("should return pledgePaid content for success when isFinalOutcome is true", () => {
      const content = getPaymentContent(PAYMENT_RESULTS.SUCCESS, true);
      expect(content.title).toBe("Pledge Paid");
    });

    it("should return correct content for failure", () => {
      const content = getPaymentContent(PAYMENT_RESULTS.FAILURE);
      expect(content.title).toBe("That’s okay.");
    });

    it("should return correct content for cancel", () => {
      const content = getPaymentContent(PAYMENT_RESULTS.CANCEL);
      expect(content.title).toBe("Payment Cancelled");
    });
  });

  describe("initiateStripeCheckout", () => {
    it("should call supabase function with correct params", async () => {
      supabase.functions.invoke.mockResolvedValue({
        data: { url: "https://stripe.com/checkout" },
        error: null,
      });

      const url = await initiateStripeCheckout("user_123", "promise_456");

      expect(supabase.functions.invoke).toHaveBeenCalledWith(
        "create-checkout",
        {
          body: {
            priceId: "test_price_id",
            userId: "user_123",
            promiseId: "promise_456",
          },
        },
      );
      expect(url).toBe("https://stripe.com/checkout");
    });

    it("should throw error if userId is missing", async () => {
      await expect(initiateStripeCheckout(null)).rejects.toThrow(
        "User ID is required",
      );
    });

    it("should throw error if supabase returns error", async () => {
      supabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: "API Error" },
      });

      await expect(initiateStripeCheckout("user_123")).rejects.toThrow(
        "API Error",
      );
    });
  });
});
