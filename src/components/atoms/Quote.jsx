import React from "react";
import PropTypes from "prop-types";

/**
 * Quote component for displaying prominent text or promises.
 */
export const Quote = ({ children, className = "", ...props }) => {
  const responsiveStyles =
    "p-md rounded-sm font-interface-md md:p-lg md:rounded-lg md:font-interface-lg";

  return (
    <div
      className={[
        "bg-accent2 text-content-base text-center italic font-regular",
        responsiveStyles,
        className,
      ].join(" ")}
      {...props}
    >
      "{children}"
    </div>
  );
};

Quote.propTypes = {
  /**
   * Quote content
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional extra classes
   */
  className: PropTypes.string,
};
