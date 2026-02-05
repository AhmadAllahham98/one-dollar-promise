import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * A glassmorphic card container with a mouse-tracking spotlight effect.
 * Designed to encapsulate organisms with a premium, interactive look.
 */
export const GlassCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 255, 255, 0.04)",
  containerClassName = "",
  as: Component = "div",
  ...props
}) => {
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
    <Component
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`group relative backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden ${className}`}
      {...props}
    >
      {/* Spotlight Hover Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isPointerInside ? 1 : 0,
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Content Container */}
      <div className={`relative z-10 w-full h-full ${containerClassName}`}>
        {children}
      </div>
    </Component>
  );
};

GlassCard.propTypes = {
  /** The content to be wrapped by the glass card */
  children: PropTypes.node.isRequired,
  /** Additional classes for the outer card container (styling the box itself) */
  className: PropTypes.string,
  /** Color of the spotlight effect */
  spotlightColor: PropTypes.string,
  /** Additional classes for the inner content container (layout for children) */
  containerClassName: PropTypes.string,
  /** The HTML element to use for the card container */
  as: PropTypes.elementType,
};
