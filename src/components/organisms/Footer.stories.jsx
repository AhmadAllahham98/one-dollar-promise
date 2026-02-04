import React from "react";
import { Footer } from "./Footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args) => (
  <div className="w-full bg-surface-100 min-h-[100px] flex items-end">
    <Footer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
