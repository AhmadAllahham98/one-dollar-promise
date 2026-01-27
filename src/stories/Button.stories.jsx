import { Button } from "./Button";

const PlusIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 4.16666V15.8333M4.16666 10H15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.16666 10H15.8333M15.8333 10L10 4.16666M15.8333 10L10 15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default {
  title: "Design/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
};

export const LargeSolid = {
  args: {
    size: "large",
    style: "solid",
    label: "Button",
  },
};

export const LargeOutline = {
  args: {
    size: "large",
    style: "outline",
    label: "Button",
  },
};

export const LargeGhost = {
  args: {
    size: "large",
    style: "ghost",
    label: "Button",
  },
};

export const SmallSolid = {
  args: {
    size: "small",
    style: "solid",
    label: "Button",
  },
};

export const SmallOutline = {
  args: {
    size: "small",
    style: "outline",
    label: "Button",
  },
};

export const SmallGhost = {
  args: {
    size: "small",
    style: "ghost",
    label: "Button",
  },
};

export const WithIconLeft = {
  args: {
    size: "large",
    style: "solid",
    label: "Add Promise",
    iconLeft: PlusIcon,
  },
};

export const WithIconRight = {
  args: {
    size: "large",
    style: "solid",
    label: "Next Step",
    iconRight: ArrowRightIcon,
  },
};

export const FullIconButton = {
  args: {
    size: "large",
    style: "solid",
    label: "Add Promise",
    iconLeft: PlusIcon,
    iconRight: ArrowRightIcon,
  },
};
