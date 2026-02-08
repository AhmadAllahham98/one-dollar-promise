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
  promise = "No promise set for today.",
  promiseActionable = false,
  onFail,
  onSuccess,
  className = "",
  ...props
}) => {
  const subsectionGap = "gap-y-xsm md:gap-y-md";

  // Wrapper for the Star Icon to be used as a component in Button
  const ThumbsDownIcon = (props) => (
    <img src={ThumbsDown} alt="Thumbs Down" {...props} />
  );
  const ThumbsUpIcon = (props) => (
    <img src={ThumbsUp} alt="Thumbs Up" {...props} />
  );

  return (
    <div
      className={`card-container section-gap flex flex-col items-center ${className}`}
      {...props}
    >
      <div className={`flex flex-col items-center w-full ${subsectionGap}`}>
        <span className="font-display-sm md:font-display-md w-full text-center text-content-base">
          Your $1 Promise is:
        </span>
        <Quote className="w-full">{promise}</Quote>
      </div>

      <div className="w-full h-[1px] bg-surface-200" />

      <div className={`flex flex-col items-center w-full ${subsectionGap}`}>
        {promiseActionable ? (
          <>
            <div className="flex flex-col items-center w-full gap-y-xsm">
              <span className="font-interface-sm md:font-interface-md w-full text-center text-content-base opacity-60">
                How did it go?
              </span>
              <span className="font-interface-sm md:font-interface-md w-full text-center text-content-base opacity-60 italic">
                (all pledges go to charity)
              </span>
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-x-sm md:gap-x-md">
              <Button
                size="large"
                style="solid"
                label="Fail"
                onClick={(e) => {
                  e.stopPropagation();
                  onFail && onFail(e);
                }}
                className="flex-1 max-w-[212px]"
                iconRight={ThumbsDownIcon}
              />
              <Button
                size="large"
                style="solid"
                label="Success"
                onClick={(e) => {
                  e.stopPropagation();
                  onSuccess && onSuccess(e);
                }}
                className="flex-1 max-w-[212px]"
                iconRight={ThumbsUpIcon}
              />
            </div>
          </>
        ) : (
          <span className="font-interface-sm md:font-interface-md w-full text-center text-content-base opacity-60">
            Check in tomorrow to update your progress.
          </span>
        )}
      </div>
    </div>
  );
};

PromiseDisplay.propTypes = {
  /**
   * The promise to display
   */
  promise: PropTypes.string,
  /**
   * Whether the promise can be acted upon (buttons shown)
   */
  promiseActionable: PropTypes.bool,
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
