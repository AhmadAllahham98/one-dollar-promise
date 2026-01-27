import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";

export const Header = ({
  size,
  className,
  onLogin,
  onLogout,
  onCreateAccount,
  ...props
}) => {
  const sizeClasses = {
    large: "p-lg h-84px w-full",
    small: "p-md h-64px w-full",
  };

  return (
    <header className={["", sizeClasses[size], className].join(" ")} {...props}>
      <img src={logo} alt="One Dollar Promise Logo" />
    </header>
  );
};

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};
