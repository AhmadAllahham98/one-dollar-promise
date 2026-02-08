import { ActivePromiseCard } from "./ActivePromiseCard";

export default {
  title: "Organisms/ActivePromiseCard",
  component: ActivePromiseCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0e1519" }],
    },
  },
};

export const Default = {
  args: {
    promiseText: "I promise to drink 2L of water today",
    daysStreak: 5,
  },
};
