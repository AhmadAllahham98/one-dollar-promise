import { LandingPage } from "./LandingPage";
import { MemoryRouter } from "react-router-dom";

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
