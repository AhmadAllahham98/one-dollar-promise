import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/Logo.svg";
import { Button } from "../atoms/Button";

export const Header = ({
  user = null,
  className = "",
  onLogout,
  onLogoClick,
  ...props
}) => {
  return (
    <header
      className={`flex flex-row items-center justify-between w-full p-md h-[64px] md:p-lg md:h-[84px] ${className}`}
      {...props}
    >
      <img
        src={logo}
        alt="One Dollar Promise Logo"
        className="p-xsm h-full w-auto object-contain shrink-0 hover:cursor-pointer"
        onClick={onLogoClick}
      />
      <div className="flex items-center gap-md ml-auto">
        {user && (
          <Button
            size="small"
            className="md:hidden"
            style="ghost"
            onClick={onLogout}
            label="Sign out"
          />
        )}
        {user && (
          <Button
            size="large"
            className="hidden md:inline-flex"
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
   * Logout handler
   */
  onLogout: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
