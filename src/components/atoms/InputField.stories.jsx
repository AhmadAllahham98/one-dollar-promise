import React from "react";
import { InputField } from "./InputField";

export default {
  title: "Atoms/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
  },
};

const Template = (args) => (
  <div className="w-[320px] md:w-[600px] p-4 bg-surface-100 border border-dashed border-gray-500">
    <InputField {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter your promise...",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Enter password...",
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "A predefined promise",
  placeholder: "Enter your promise...",
};
