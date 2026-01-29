import React from "react";
import { PromiseDisplay } from "./PromiseDisplay";

export default {
  title: "Organisms/PromiseDisplay",
  component: PromiseDisplay,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onFail: { action: "failed" },
    onSuccess: { action: "succeeded" },
    promiseActionable: { control: "boolean" },
  },
};

const Template = (args) => (
  <div className="w-[320px] md:w-[800px] p-4 md:p-10 bg-surface-100 flex justify-center border border-dashed border-gray-500">
    <PromiseDisplay {...args} />
  </div>
);

export const Actionable = Template.bind({});
Actionable.args = {
  promise: "I will drink 3 liters of water today and finish the React project.",
  promiseActionable: true,
};

export const NonActionable = Template.bind({});
NonActionable.args = {
  promise: "I will drink 3 liters of water today and finish the React project.",
  promiseActionable: false,
};

export const Default = Template.bind({});
Default.args = {
  promise: "No promise set for today.",
  promiseActionable: false,
};
