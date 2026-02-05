import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseForm } from "../organisms/PromiseForm";

export const DashboardPage = () => {
  return (
    <MainTemplate className="animate-breath" alignment="center">
      <PromiseForm />
    </MainTemplate>
  );
};
