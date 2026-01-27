import React from "react";
import PropTypes from "prop-types";

/**
 * Quote component for displaying prominent text or promises.
 */
export const Quote = ({ size, children, className, ...props }) => {
  const sizeClasses = {
    large: "p-lg rounded-lg font-interface-lg",
    small: "p-md rounded-sm font-interface-md",
  };

  return (
    <div
      className={[
        "bg-accent2 text-content-base text-center italic font-regular",
        sizeClasses[size],
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
   * How large should the quote be?
   */
  size: PropTypes.oneOf(["small", "large"]),
  /**
   * Quote content
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional extra classes
   */
  className: PropTypes.string,
};

Quote.defaultProps = {
  size: "large",
  className: "",
};
