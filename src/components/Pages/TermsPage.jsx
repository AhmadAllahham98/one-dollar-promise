import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";

export const TermsPage = () => {
  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding max-w-2xl w-full"
        containerClassName="flex flex-col items-start section-gap w-full"
      >
        <div className="flex flex-col gap-y-sm w-full">
          <h1 className="font-display-md text-accent">Terms of Service</h1>
          <p className="text-content-subtle font-interface-sm">
            Last updated: February 16, 2026
          </p>
        </div>

        <div className="flex flex-col gap-y-md text-content-base font-interface-md overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">1. Agreement to Terms</h2>
            <p className="text-content-subtle">
              By accessing or using One Dollar Promise, you agree to be bound by
              these Terms of Service. If you disagree with any part of the
              terms, you may not access the service.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">2. Description of Service</h2>
            <p className="text-content-subtle">
              One Dollar Promise is a platform where users can make commitments
              ("promises"). If a user fails to keep their promise
              (Self-Reported), they agree to pay a fee of one dollar ($1.00 USD)
              plus processing fees.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">3. Payments</h2>
            <p className="text-content-subtle">
              Payments are processed through Stripe. By choosing to pay for a
              failed promise, you authorize us to charge your credit card or
              other payment method for the specified amount. All payments are
              final and non-refundable.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">4. User Accounts</h2>
            <p className="text-content-subtle">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">5. User Conduct</h2>
            <p className="text-content-subtle">
              You agree not to use the service for any illegal or unauthorized
              purpose. You must not, in the use of the service, violate any laws
              in your jurisdiction.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">6. Limitation of Liability</h2>
            <p className="text-content-subtle">
              In no event shall One Dollar Promise be liable for any indirect,
              incidental, special, consequential or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">7. Changes to Terms</h2>
            <p className="text-content-subtle">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide notice of any significant
              changes.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">8. Contact Us</h2>
            <p className="text-content-subtle">
              If you have any questions about these Terms, please contact us at
              ahmad.allahham.1998@gmail.com.
            </p>
          </section>
        </div>
      </GlassCard>
    </MainTemplate>
  );
};
