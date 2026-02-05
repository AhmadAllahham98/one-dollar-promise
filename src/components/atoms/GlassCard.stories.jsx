import React from "react";
import { GlassCard } from "./GlassCard";

export default {
  title: "Atoms/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    spotlightColor: { control: "color" },
  },
};

const Template = (args) => (
  <div className="p-10 bg-slate-900 min-h-[400px] flex items-center justify-center w-full">
    <GlassCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  className: "w-80 p-8",
  containerClassName: "flex flex-col gap-4 text-white",
  children: (
    <>
      <h2 className="text-xl font-bold">Glass Card</h2>
      <p className="text-sm opacity-80">
        This is a reusable glassmorphic card with a mouse-tracking spotlight
        effect.
      </p>
      <div className="h-20 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
        Content Slot
      </div>
    </>
  ),
};

export const CustomSpotlight = Template.bind({});
CustomSpotlight.args = {
  ...Default.args,
  spotlightColor: "rgba(255, 0, 255, 0.1)", // Pinkish spotlight
  children: (
    <>
      <h2 className="text-xl font-bold">Pink Spotlight</h2>
      <p className="text-sm opacity-80">
        You can customize the spotlight color to match your theme.
      </p>
    </>
  ),
};
