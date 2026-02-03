import React from "react";
import { LandingPage } from "./LandingPage";

export default {
  title: "Pages/LandingPage",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => <LandingPage />;
