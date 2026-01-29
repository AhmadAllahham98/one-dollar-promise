import React from "react";
import { PromiseForm } from "./PromiseForm";

export default {
  title: "Organisms/PromiseForm",
  component: PromiseForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onPromise: { action: "promised" },
  },
};

const Template = (args) => (
  <div className="w-[320px] md:w-[800px] p-4 md:p-10 bg-surface-100 border border-dashed border-gray-500">
    <PromiseForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
