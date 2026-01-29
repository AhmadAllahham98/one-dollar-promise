import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Standard Input Box (Textarea) component with character limit and flex layout.
 */
export const InputBox = ({
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

  const responsiveStyles =
    "py-xsm px-sm rounded-sm gap-y-1 md:py-sm md:px-md md:rounded-lg md:gap-y-xsm";

  const textareaStyles =
    "w-full bg-transparent text-content-inverse border-none focus:outline-none focus:ring-0 resize-none placeholder:text-black/40";

  const textFont = "font-interface-sm md:font-interface-md";
  const counterFont = "font-interface-sm md:font-interface-md";

  return (
    <div className={`${containerBase} ${responsiveStyles} ${className}`}>
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
