import React from "react";
import PropTypes from "prop-types";
import { Header } from "../organisms/Header";

/**
 * MainTemplate component providing the base layout structure.
 * Includes a Header at the top and a centered flex-column body.
 */
export const MainTemplate = ({
  user = null,
  onLogout,
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`} {...props}>
      <Header user={user} onLogout={onLogout} />
      <main className="page-body">{children}</main>
    </div>
  );
};

MainTemplate.propTypes = {
  /**
   * Current user object
   */
  user: PropTypes.object,
  /**
   * Logout handler passed to Header
   */
  onLogout: PropTypes.func,
  /**
   * Main content of the page
   */
  children: PropTypes.node,
  /**
   * Additional classes for the wrapper
   */
  className: PropTypes.string,
};
