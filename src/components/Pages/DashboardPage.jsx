import React from "react";
import { useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { PromiseForm } from "../organisms/PromiseForm";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handlePromiseCreated = (promise) => {
    console.log("Promise created:", promise);
    // Navigate to the status page after promise creation
    navigate("/promise-status");
  };

  return (
    <MainTemplate alignment="center">
      <PromiseForm onPromiseCreated={handlePromiseCreated} />
    </MainTemplate>
  );
};
