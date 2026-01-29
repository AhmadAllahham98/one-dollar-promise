import React from "react";
import { InputBox } from "./InputBox";

export default {
  title: "Atoms/InputBox",
  component: InputBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const Template = (args) => (
  <div className="w-[320px] md:w-[600px] p-4 bg-surface-100 border border-dashed border-gray-500">
    <InputBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter your message...",
  rows: 4,
};

export const WithContent = Template.bind({});
WithContent.args = {
  placeholder: "Enter your message...",
  value:
    "This is a pre-filled multiline message that shows how the text adapts to different screen sizes.",
  rows: 4,
};
