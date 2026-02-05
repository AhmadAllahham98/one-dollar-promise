import React from "react";
import { MemoryRouter } from "react-router-dom";
import { LandingPage } from "./LandingPage";

export default {
  title: "Pages/LandingPage",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = () => <LandingPage />;
