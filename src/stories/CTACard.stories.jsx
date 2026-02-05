import { CTACard } from "../components/organisms/CTACard";

export default {
  title: "Organisms/CTACard",
  component: CTACard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0e1519" }],
    },
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};

export const CustomStyle = {
  args: {
    className: "border-accent/40",
  },
};
