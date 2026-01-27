import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/Logo.svg";
import { Button } from "./Button";

export const Header = ({
  size = "large",
  className = "",
  onLogin,
  onLogout,
  onCreateAccount,
  ...props
}) => {
  const sizeClasses = {
    large: "p-lg h-[84px]",
    small: "p-md h-[64px]",
  };

  return (
    <header
      className={[
        "flex flex-row items-center justify-between w-full bg-surface-100",
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      <img
        src={logo}
        alt="One Dollar Promise Logo"
        className="h-full w-auto object-contain shrink-0"
      />
      <Button
        size={size}
        style="ghost"
        onClick={onLogin}
        label="Sign out"
        className="ml-auto"
      />
    </header>
  );
};

Header.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "large"]),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};

Header.defaultProps = {
  size: "large",
  className: "",
  onLogin: () => {},
  onLogout: () => {},
  onCreateAccount: () => {},
};
