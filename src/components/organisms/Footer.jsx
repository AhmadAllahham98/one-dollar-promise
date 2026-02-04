import React from "react";
import PropTypes from "prop-types";

export const Footer = ({ className = "", ...props }) => {
  const responsiveTextStyle = "font-interface-sm md:font-interface-md";

  return (
    <footer
      className={`w-full flex flex-row items-center justify-between p-md md:p-lg ${className}`}
      {...props}
    >
      <p className={`font-light ${responsiveTextStyle}`}>
        © 2026 One Dollar Promise
      </p>
      <p className={responsiveTextStyle}>
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
