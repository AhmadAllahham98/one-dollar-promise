import React from "react";
import PropTypes from "prop-types";

/**
 * Standard Input Field component.
 */
export const InputField = ({
  placeholder = "Type here...",
  value,
  onChange,
  type = "text",
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full bg-surface-white text-content-inverse font-interface-sm md:font-interface-md py-xsm px-sm md:py-sm md:px-md rounded-sm md:rounded-lg border-2 border-surface-200 transition-all placeholder:text-black/40 focus:outline-none focus:border-2 focus:border-black/5";

  return (
    <input
      type={type}
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

InputField.propTypes = {
  /**
   * Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Input value
   */
  value: PropTypes.string,
  /**
   * Change handler
   */
  onChange: PropTypes.func,
  /**
   * Input type (text, password, email, etc.)
   */
  type: PropTypes.string,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
