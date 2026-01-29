import React from "react";
import { Quote } from "./Quote";

export default {
  title: "Atoms/Quote",
  component: Quote,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args) => (
  <div className="w-[320px] md:w-[600px] p-4 bg-surface-100 border border-dashed border-gray-500">
    <Quote {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "I promise to keep my phone away during meals",
};
