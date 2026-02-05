import React, { useState } from "react";
import { MainTemplate } from "../templates/MainTemplate";
import { SignUpAuthForm } from "../organisms/SignUpAuthForm";
import { UserPromiseDisplay } from "../organisms/UserPromiseDisplay";
import StarIcon from "../../assets/StarIcon.svg";

const RESPONSIVE_TITLE_STYLE = "font-display-md md:font-display-lg";
const RESPONSIVE_SUBTITLE_STYLE = "font-interface-md md:font-interface-lg";

export const LandingPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointerInside, setIsPointerInside] = useState(false);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerEnter = () => setIsPointerInside(true);
  const handlePointerLeave = () => setIsPointerInside(false);

  return (
    <MainTemplate className="animate-breath">
      {/* 
          The UserPromiseDisplay is now absolute-positioned inside the template body.
          We pass 720 as the safeWidthPx to match the CTA card width + breathing room.
       */}
      <UserPromiseDisplay
        safeWidthPx={840}
        maxReachPx={800}
        minReachPy={160}
        maxReachPy={800}
      />

      {/* Central CTA Card */}
      <section
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="group relative flex flex-col items-center justify-center gap-y-md md:gap-y-lg max-w-[343px] md:max-w-[684px] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 overflow-hidden"
      >
        {/* White Gradient Hover Effect (Spotlight) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isPointerInside ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 255, 0.04), transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-y-md md:gap-y-lg w-full">
          <h1 className={`text-center ${RESPONSIVE_TITLE_STYLE}`}>
            Promises that st
            <span className="relative inline-flex items-center">
              ı
              <img
                src={StarIcon}
                className="absolute -top-[-0.1em] left-1/2 -translate-x-1/2 w-[0.32em] h-[0.32em] max-w-none"
                alt=""
              />
            </span>
            ck
          </h1>

          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />

          {/* Subtitles */}
          <div className="flex flex-col items-center justify-center gap-y-xsm md:gap-y-md">
            <p
              className={`font-light text-center ${RESPONSIVE_SUBTITLE_STYLE}`}
            >
              The easiest way to start{" "}
              <span className="font-bold text-accent">keeping</span> promises.
            </p>
            <p
              className={`font-light text-center ${RESPONSIVE_SUBTITLE_STYLE}`}
            >
              Make a <span className="font-bold text-accent">$1</span> promise.
              Keep it. Get your dollar back.
            </p>
          </div>

          {/* Auth Form Registration */}
          <SignUpAuthForm />
        </div>
      </section>
    </MainTemplate>
  );
};
