import React from "react";
import { TextMessage } from "./TextMessage";

export default {
  title: "Organisms/TextMessage",
  component: TextMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args) => (
  <div className="w-[320px] md:w-[800px] p-4 md:p-10 bg-surface-100 border border-dashed border-gray-500">
    <TextMessage {...args} />
  </div>
);

export const Success = Template.bind({});
Success.args = {
  title: "Awesome.",
  message: "You get your $1 pledge back. Keep it up!",
};

export const Failure = Template.bind({});
Failure.args = {
  title: "Oops.",
  message: "You lost your $1 pledge. Try again tomorrow!",
};
