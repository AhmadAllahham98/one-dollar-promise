import React from "react";
import PropTypes from "prop-types";

/**
 * Unified Button component supporting multiple sizes and styles.
 */
export const Button = ({
  size = "large",
  style = "solid",
  label = "Button",
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-between gap-xsm font-bold transition-all cursor-pointer";

  const sizeStyles = {
    large: "py-sm px-md rounded-lg font-interface-md",
    small: "py-xsm px-sm rounded-sm font-interface-sm",
  };

  const variantStyles = {
    solid:
      "bg-surface-200 text-white shadow-main border-none hover:bg-white/10",
    outline:
      "bg-transparent border-2 border-surface-200 text-white shadow-main hover:bg-white/10 hover:border-transparent",
    ghost: "bg-transparent border-none text-white hover:bg-white/10",
  };

  const iconSize = size === "large" ? "w-5 h-5" : "w-4 h-4";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[style]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Boolean(IconLeft || IconRight) &&
        (IconLeft ? (
          <IconLeft className={`${iconSize} shrink-0`} />
        ) : (
          <div className={`${iconSize} shrink-0`} />
        ))}
      <span className="flex-1 text-center">{label}</span>
      {Boolean(IconLeft || IconRight) &&
        (IconRight ? (
          <IconRight className={`${iconSize} shrink-0`} />
        ) : (
          <div className={`${iconSize} shrink-0`} />
        ))}
    </button>
  );
};

Button.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "large"]),
  /**
   * The visual style of the button
   */
  style: PropTypes.oneOf(["solid", "outline", "ghost"]),
  /**
   * The text label for the button
   */
  label: PropTypes.string,
  /**
   * Optional icon to display on the left
   */
  iconLeft: PropTypes.elementType,
  /**
   * Optional icon to display on the right
   */
  iconRight: PropTypes.elementType,
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
