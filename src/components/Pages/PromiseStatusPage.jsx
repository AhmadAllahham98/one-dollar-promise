import React from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseDisplay } from "../organisms/PromiseDisplay";

export const PromiseStatusPage = () => {
  return (
    <MainTemplate alignment="center">
      <PromiseDisplay />
    </MainTemplate>
  );
};
