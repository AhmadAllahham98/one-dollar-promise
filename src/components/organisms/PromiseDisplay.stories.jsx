import { PromiseDisplay } from "./PromiseDisplay";

export default {
  title: "Organisms/PromiseDisplay",
  component: PromiseDisplay,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    onFail: { action: "failed" },
    onSuccess: { action: "succeeded" },
  },
};

const Template = (args) => (
  <div className="w-[800px] p-10 bg-surface-100 flex justify-center">
    <PromiseDisplay {...args} />
  </div>
);

export const ActiveLarge = Template.bind({});
ActiveLarge.args = {
  size: "large",
  promise: "I will drink 3 liters of water today and finish the React project.",
};

export const ActiveSmall = Template.bind({});
ActiveSmall.args = {
  size: "small",
  promise: "Write 500 words of my blog post.",
};

export const EmptyLarge = Template.bind({});
EmptyLarge.args = {
  size: "large",
  promise: "",
};

export const EmptySmall = Template.bind({});
EmptySmall.args = {
  size: "small",
  promise: "",
};
