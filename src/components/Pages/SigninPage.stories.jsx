import { SignInPage } from "./SigninPage";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/SigninPage",
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
