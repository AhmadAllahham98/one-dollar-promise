import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Standard Input Box (Textarea) component with character limit and flex layout.
 */
export const InputBox = ({
  size = "large",
  placeholder = "Type here...",
  value = "",
  onChange,
  rows = 4,
  maxLength = 280,
  className = "",
  ...props
}) => {
  // Internal state to allow the component to be "self-controlled"
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal state if the external 'value' prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const containerBase =
    "flex flex-col bg-surface-white border-2 border-surface-200 transition-all focus-within:border-black/5";

  const sizeStyles = {
    large: "py-sm px-md rounded-lg gap-y-xsm",
    small: "py-xsm px-sm rounded-sm gap-y-1",
  };

  const textareaStyles =
    "w-full bg-transparent text-content-inverse border-none focus:outline-none focus:ring-0 resize-none placeholder:text-black/40";

  const textFont = size === "large" ? "font-interface-md" : "font-interface-sm";
  const counterFont =
    size === "large" ? "font-interface-md" : "font-interface-sm";

  return (
    <div className={`${containerBase} ${sizeStyles[size]} ${className}`}>
      <textarea
        rows={rows}
        maxLength={maxLength}
        className={`${textareaStyles} ${textFont}`}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        {...props}
      />
      {maxLength && (
        <div className={`self-end text-black/40 leading-none ${counterFont}`}>
          {internalValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

InputBox.propTypes = {
  /**
   * How large should the input box be?
   */
  size: PropTypes.oneOf(["small", "large"]),
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
   * Number of rows to display
   */
  rows: PropTypes.number,
  /**
   * Maximum characters allowed
   */
  maxLength: PropTypes.number,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};

InputBox.defaultProps = {
  size: "large",
  placeholder: "Type here...",
  value: undefined,
  onChange: undefined,
  rows: 4,
  maxLength: 280,
  className: "",
};
