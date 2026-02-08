import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { GlassCard } from "../atoms/GlassCard";
import { TextMessage } from "../organisms/TextMessage";

export const PromiseResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || "success";

  const content = {
    success: {
      title: "Awesome.",
      message: "You're good to go. Keep it up!",
    },
    failure: {
      title: "That’s okay.",
      message: "You will now be redirected to pay your pledge.",
    },
  };

  const { title, message } = content[result] || content.success;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MainTemplate alignment="center">
      <GlassCard
        as="section"
        className="card-container card-padding"
        containerClassName="flex flex-col items-center justify-center section-gap w-full"
      >
        <TextMessage title={title} message={message} />
      </GlassCard>
    </MainTemplate>
  );
};
