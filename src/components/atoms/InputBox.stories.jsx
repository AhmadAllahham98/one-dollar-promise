import { InputBox } from "./InputBox";

export default {
  title: "Atoms/InputBox",
  component: InputBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Large = {
  args: {
    size: "large",
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const Small = {
  args: {
    size: "small",
    placeholder: "Short note...",
    rows: 2,
  },
};

export const WithContent = {
  args: {
    size: "large",
    placeholder: "Enter your message...",
    value:
      "This is a pre-filled multiline message that shows how the text wraps within the input box.",
    rows: 4,
  },
};
