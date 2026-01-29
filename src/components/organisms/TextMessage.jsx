import React from "react";
import PropTypes from "prop-types";

/**
 * TextMessage component for displaying a text message with a title and description.
 * Adheres to the design system's typography and spacing tokens.
 */
export const TextMessage = ({
  title = "Awesome.",
  message = "You get your $1 pledge back. Keep it up!",
  className = "",
  ...props
}) => {
  const titleStyle = "font-display-sm md:font-display-md";
  const messageStyle = "font-interface-sm md:font-interface-md";
  const sectionGap = "gap-y-md md:gap-y-lg";

  return (
    <div
      className={`flex flex-col items-center w-full max-w-[684px] ${sectionGap} ${className}`}
      {...props}
    >
      <h2 className={`${titleStyle} w-full text-center text-content-base`}>
        {title}
      </h2>
      <p className={`${messageStyle} w-full text-center text-content-base`}>
        {message}
      </p>
    </div>
  );
};

TextMessage.propTypes = {
  /**
   * The title to display
   */
  title: PropTypes.node,
  /**
   * The message to display
   */
  message: PropTypes.node,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
