import React from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { Quote } from "../atoms/Quote";

/**
 * PromiseDisplay component for displaying a promise and recording the outcome.
 */
export const PromiseDisplay = ({
  size = "large",
  promise = "",
  onFail,
  onSuccess,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    large: "gap-y-lg",
    small: "gap-y-md",
  };

  const headingStyle = size === "large" ? "font-display-md" : "font-display-sm";
  const interfaceStyle =
    size === "large" ? "font-interface-md" : "font-interface-sm";
  const buttonGap = size === "large" ? "gap-x-md" : "gap-x-sm";
  const bottomGap = size === "large" ? "gap-y-md" : "gap-y-xsm";

  return (
    <div
      className={`flex flex-col items-center w-full max-w-[684px] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center w-full gap-y-md">
        <span
          className={`${headingStyle} w-full text-center text-content-base`}
        >
          Your $1 Promise is:
        </span>
        <Quote size={size}>{promise || "No promise set for today."}</Quote>
      </div>

      <div className="w-full h-[1px] bg-surface-200" />

      <div className={`flex flex-col items-center w-full ${bottomGap}`}>
        <span
          className={`${interfaceStyle} w-full text-center text-content-base`}
        >
          How did it go?
        </span>
        {promise ? (
          <div className={`flex flex-row w-full items-center ${buttonGap}`}>
            <Button
              size={size}
              style="outline"
              label="Fail (-$1)"
              onClick={onFail}
              className="flex-1"
            />
            <Button
              size={size}
              style="solid"
              label="Success (+$1)"
              onClick={onSuccess}
              className="flex-1"
            />
          </div>
        ) : (
          <span
            className={`${interfaceStyle} w-full text-center text-content-base opacity-60`}
          >
            Check in tomorrow to update your progress.
          </span>
        )}
      </div>
    </div>
  );
};

PromiseDisplay.propTypes = {
  /**
   * The size variant of the display
   */
  size: PropTypes.oneOf(["small", "large"]),
  /**
   * The promise to display
   */
  promise: PropTypes.string,
  /**
   * Callback when "Fail" is clicked
   */
  onFail: PropTypes.func,
  /**
   * Callback when "Success" is clicked
   */
  onSuccess: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};

PromiseDisplay.defaultProps = {
  size: "large",
  promise: "",
  onFail: undefined,
  onSuccess: undefined,
  className: "",
};
