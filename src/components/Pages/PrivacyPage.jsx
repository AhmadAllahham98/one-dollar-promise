import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";

export const PrivacyPage = () => {
  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding max-w-2xl w-full"
        containerClassName="flex flex-col items-start section-gap w-full"
      >
        <div className="flex flex-col gap-y-sm w-full">
          <h1 className="font-display-md text-accent">Privacy Policy</h1>
          <p className="text-content-subtle font-interface-sm">
            Last updated: February 16, 2026
          </p>
        </div>

        <div className="flex flex-col gap-y-md text-content-base font-interface-md overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">1. Introduction</h2>
            <p className="text-content-subtle">
              Welcome to One Dollar Promise. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you as to how we look after your personal data when
              you visit our website.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">2. Data We Collect</h2>
            <p className="text-content-subtle">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc ml-6 text-content-subtle flex flex-col gap-y-xsm">
              <li>
                <strong>Identity Data:</strong> Includes email address and basic
                profile information provided during signup or via Google
                Authentication.
              </li>
              <li>
                <strong>Promise Data:</strong> Includes the content of the
                promises you create on our platform.
              </li>
              <li>
                <strong>Transaction Data:</strong> Includes details about
                payments made through Stripe when a promise is not kept. We do
                not store your credit card information; this is handled entirely
                by Stripe.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">3. How We Use Your Data</h2>
            <p className="text-content-subtle">
              We use your data to provide our service, specifically to:
            </p>
            <ul className="list-disc ml-6 text-content-subtle flex flex-col gap-y-xsm">
              <li>Create and manage your account.</li>
              <li>Track the status of your promises.</li>
              <li>Process payments via Stripe.</li>
              <li>Communicate with you regarding your account and promises.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">4. Data Security</h2>
            <p className="text-content-subtle">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">5. Third-Party Services</h2>
            <p className="text-content-subtle">
              We use Supabase for authentication and database management, and
              Stripe for payment processing. These services have their own
              privacy policies governing how they handle your data.
            </p>
          </section>

          <section className="flex flex-col gap-y-xsm">
            <h2 className="font-display-sm">6. Contact Us</h2>
            <p className="text-content-subtle">
              If you have any questions about this privacy policy, please
              contact us at ahmad.allahham.1998@gmail.com.
            </p>
          </section>
        </div>
      </GlassCard>
    </MainTemplate>
  );
};
