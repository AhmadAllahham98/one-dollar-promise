import React from "react";
import { MainTemplate } from "./MainTemplate";
import { TextMessage } from "../organisms/TextMessage";

export default {
  title: "Templates/MainTemplate",
  component: MainTemplate,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <MainTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: { name: "John Doe" },
  children: (
    <div className="w-full max-w-[684px] flex flex-col items-center">
      <TextMessage
        title="Welcome to the Template"
        message="This is how the main layout looks with the header and body padding."
      />
    </div>
  ),
};

export const Centered = Template.bind({});
Centered.args = {
  ...Default.args,
  alignment: "center",
};

export const Empty = Template.bind({});
Empty.args = {
  user: null,
  children: <div className="text-content-base">Main content goes here</div>,
};
