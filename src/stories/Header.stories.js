import { fn } from "storybook/test";

import { Header } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
  args: {
    onLogout: fn(),
  },
};

export const Large = {
  args: {
    size: "large",
  },
};

export const Small = {
  args: {
    size: "small",
  },
};

export const LoggedIn = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut = {
  args: {
    user: null,
  },
};
