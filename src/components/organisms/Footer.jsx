import React from "react";
import { Link } from "react-router-dom";
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
      <div className="flex flex-col items-center gap-y-xsm md:items-end">
        <p className={`text-center italic ${responsiveTextStyle}`}>
          All proceeds go to supporting the people of{" "}
          <span className="text-accent font-bold">Gaza</span>
        </p>
        <div className="flex gap-x-md">
          <Link
            to="/privacy"
            className={`${responsiveTextStyle} text-content-subtle hover:text-content-base transition-colors`}
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className={`${responsiveTextStyle} text-content-subtle hover:text-content-base transition-colors`}
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
