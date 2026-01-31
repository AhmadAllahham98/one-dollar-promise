import { UserPromiseDisplay } from "./UserPromiseDisplay";

export default {
  title: "Organisms/UserPromiseDisplay",
  component: UserPromiseDisplay,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  args: {
    className: "bg-surface-200", // Darker background to see it better in Storybook
  },
};

export const CustomPromises = {
  args: {
    promises: [
      {
        id: 1,
        imageUrl: "https://i.pravatar.cc/150?u=a",
        promiseText: "I'll be kind to everyone",
      },
      {
        id: 2,
        imageUrl: "https://i.pravatar.cc/150?u=b",
        promiseText: "I'll save $10 this week",
      },
      {
        id: 3,
        imageUrl: "https://i.pravatar.cc/150?u=c",
        promiseText: "I'll wake up at 6 AM",
      },
      {
        id: 4,
        imageUrl: "https://i.pravatar.cc/150?u=d",
        promiseText: "I'll call my grandma",
      },
    ],
    className: "bg-surface-100",
  },
};
