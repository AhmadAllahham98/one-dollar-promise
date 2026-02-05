import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * MainTemplate component providing the base layout structure for page content.
 * Focuses on the main body with fade-in/out animations.
 */
export const MainTemplate = ({
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`page-body ${alignmentClasses[alignment] || ""} ${className}`}
      {...props}
    >
      {children}
    </motion.main>
  );
};

MainTemplate.propTypes = {
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
