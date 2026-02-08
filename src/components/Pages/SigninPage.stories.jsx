import { SignInPage } from "./SignInPage";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/SignInPage",
  component: SignInPage,
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

export const Default = {};
