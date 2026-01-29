import { TextMessage } from "./TextMessage";

export default {
  title: "Organisms/TextMessage",
  component: TextMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
};

export const Success = {
  args: {
    size: "large",
    title: "Awesome.",
    message: "You get your $1 pledge back. Keep it up!",
  },
};

export const Failure = {
  args: {
    size: "large",
    title: "Oops.",
    message: "You lost your $1 pledge. Try again tomorrow!",
  },
};

export const Small = {
  args: {
    size: "small",
    title: "Daily Check-in",
    message: "Ready to make another promise?",
  },
};
