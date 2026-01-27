import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/Logo.svg";
import { Button } from "../atoms/Button";

export const Header = ({
  user = null,
  size = "large",
  className = "",
  onLogout,
  ...props
}) => {
  const sizeClasses = {
    large: "p-lg h-[84px]",
    small: "p-md h-[64px]",
  };

  return (
    <header
      className={`flex flex-row items-center justify-between w-full bg-surface-100 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <img
        src={logo}
        alt="One Dollar Promise Logo"
        className="h-full w-auto object-contain shrink-0"
      />
      <div className="flex items-center gap-md ml-auto">
        {user && (
          <Button
            size={size === "small" ? "small" : "large"}
            style="ghost"
            onClick={onLogout}
            label="Sign out"
          />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  /**
   * Current user object, null if not logged in
   */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  /**
   * Header size variant
   */
  size: PropTypes.oneOf(["small", "large"]),
  /**
   * Logout handler
   */
  onLogout: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};

Header.defaultProps = {
  user: null,
  size: "large",
  className: "",
  onLogout: undefined,
};
