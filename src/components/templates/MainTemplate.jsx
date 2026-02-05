import React from "react";
import PropTypes from "prop-types";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

/**
 * MainTemplate component providing the base layout structure.
 * Includes a Header at the top and a centered flex-column body.
 */
export const MainTemplate = ({
  user = null,
  onLogout,
  children,
  className = "",
  alignment = "top",
  ...props
}) => {
  const alignmentClasses = {
    top: "justify-start",
    center: "justify-center",
  };

  return (
    <div className={`min-h-screen flex flex-col ${className}`} {...props}>
      <Header user={user} onLogout={onLogout} />
      <main className={`page-body ${alignmentClasses[alignment] || ""}`}>
        {children}
      </main>
      <Footer />
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
   * Vertical alignment of the content ('top' or 'center')
   */
  alignment: PropTypes.oneOf(["top", "center"]),
  /**
   * Additional classes for the wrapper
   */
  className: PropTypes.string,
};
