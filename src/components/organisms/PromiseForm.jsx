import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { InputBox } from "../atoms/InputBox";
import StarIconUrl from "../../assets/StarIcon.svg";

/**
 * PromiseForm component for creating new promises.
 */
export const PromiseForm = ({
  size = "large",
  onPromise,
  className = "",
  ...props
}) => {
  const [promise, setPromise] = useState("");

  const sizeClasses = {
    large: "gap-y-lg",
    small: "gap-y-md",
  };

  const headingStyle = size === "large" ? "font-display-md" : "font-display-sm";

  // Wrapper for the Star Icon to be used as a component in Button
  const StarIcon = (props) => <img src={StarIconUrl} alt="Star" {...props} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPromise) {
      onPromise(promise);
    }
  };

  return (
    <form
      className={`flex flex-col items-center w-full max-w-[684px] ${sizeClasses[size]} ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      <span className={`${headingStyle} w-full text-center text-content-base`}>
        What's your promise for today?
      </span>
      <div className="w-full h-[1px] bg-surface-200" />
      <div
        className={`flex flex-col items-center w-full ${size === "large" ? "gap-y-md" : "gap-y-xsm"}`}
      >
        <InputBox
          size={size}
          placeholder="Promise"
          value={promise}
          className="w-full"
          onChange={(e) => setPromise(e.target.value)}
        />
        <Button
          size="large" // This is intentionally large per design
          style="solid"
          type="submit"
          label="Promise? ($1)"
          iconRight={StarIcon}
        />
      </div>
    </form>
  );
};

PromiseForm.propTypes = {
  /**
   * The size variant of the form
   */
  size: PropTypes.oneOf(["small", "large"]),
  /**
   * Callback when the promise is submitted
   */
  onPromise: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
