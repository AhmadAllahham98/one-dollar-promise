import React from "react";
import { MainTemplate } from "../templates/MainTemplate";

export const LoadingPage = () => {
  return (
    <MainTemplate alignment="center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-accent animate-pulse">Initializing...</p>
      </div>
    </MainTemplate>
  );
};
