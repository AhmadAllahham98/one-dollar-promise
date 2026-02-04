import React from "react";
import PropTypes from "prop-types";

export const Footer = ({ className = "", ...props }) => {
  const responsiveTextStyle = "font-interface-sm md:font-interface-md";

  return (
    <footer
      className={`w-full flex flex-row items-center justify-center md:justify-between p-md md:p-lg ${className}`}
      {...props}
    >
      <p
        className={`hidden md:inline-flex font-light text-center ${responsiveTextStyle}`}
      >
        © 2026 One Dollar Promise
      </p>
      <p className={`text-center ${responsiveTextStyle}`}>
        All proceeds go to supporting the people of{" "}
        <span className="text-accent font-bold">Gaza</span>
      </p>
    </footer>
  );
};

Footer.propTypes = {
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
