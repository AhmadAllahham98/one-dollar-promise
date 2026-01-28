import { PromiseForm } from "./PromiseForm";

export default {
  title: "Organisms/PromiseForm",
  component: PromiseForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    onPromise: { action: "promised" },
  },
};

const Template = (args) => (
  <div className="w-[800px] p-10 bg-surface-100">
    <PromiseForm {...args} />
  </div>
);

export const Large = Template.bind({});
Large.args = {
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};
