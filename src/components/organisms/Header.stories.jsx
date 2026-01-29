import React from "react";
import { fn } from "storybook/test";
import { Header } from "./Header";

export default {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onLogout: fn(),
  },
};

const Template = (args) => (
  <div className="w-full bg-surface-100">
    <Header {...args} />
  </div>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: "Jane Doe",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};
