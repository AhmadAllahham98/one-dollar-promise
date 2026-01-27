import { fn } from "storybook/test";
import { AuthForm } from "./AuthForm";

export default {
  title: "Organisms/AuthForm",
  component: AuthForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["login", "signup"],
    },
  },
  args: {
    onLogin: fn(),
    onSignup: fn(),
    onGoogleAction: fn(),
  },
};

export const Login = {
  args: {
    type: "login",
  },
};

export const Signup = {
  args: {
    type: "signup",
  },
};
