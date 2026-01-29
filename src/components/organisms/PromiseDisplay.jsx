import React from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { Quote } from "../atoms/Quote";
import ThumbsDown from "../../assets/ThumbDown.svg";
import ThumbsUp from "../../assets/ThumbUp.svg";

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
  const headingStyle = size === "large" ? "font-display-md" : "font-display-sm";
  const interfaceStyle =
    size === "large" ? "font-interface-md" : "font-interface-sm";
  const buttonsGap = size === "large" ? "gap-x-md" : "gap-x-sm";
  const sectionGap = size === "large" ? "gap-y-lg" : "gap-y-md";
  const subsectionGap = size === "large" ? "gap-y-md" : "gap-y-xsm";

  // Wrapper for the Star Icon to be used as a component in Button
  const ThumbsDownIcon = (props) => (
    <img src={ThumbsDown} alt="Thumbs Down" {...props} />
  );
  const ThumbsUpIcon = (props) => (
    <img src={ThumbsUp} alt="Thumbs Up" {...props} />
  );

  return (
    <div
      className={`flex flex-col items-center w-full max-w-[684px] ${sectionGap} ${className}`}
      {...props}
    >
      <div className={`flex flex-col items-center w-full ${subsectionGap}`}>
        <span
          className={`${headingStyle} w-full text-center text-content-base`}
        >
          Your $1 Promise is:
        </span>
        <Quote size={size} className="w-full">
          {promise || "No promise set for today."}
        </Quote>
      </div>

      <div className="w-full h-[1px] bg-surface-200" />

      <div className={`flex flex-col items-center w-full ${subsectionGap}`}>
        {promise ? (
          <>
            <span
              className={`${interfaceStyle} w-full text-center text-content-base`}
            >
              How did it go?
            </span>
            <div
              className={`flex flex-row w-full items-center justify-center ${buttonsGap}`}
            >
              <Button
                size="large"
                style="solid"
                label="Fail (-$1)"
                onClick={onFail}
                className="flex-1 max-w-[212px]"
                iconRight={ThumbsDownIcon}
              />
              <Button
                size="large"
                style="solid"
                label="Success (+$1)"
                onClick={onSuccess}
                className="flex-1 max-w-[212px]"
                iconRight={ThumbsUpIcon}
              />
            </div>
          </>
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
