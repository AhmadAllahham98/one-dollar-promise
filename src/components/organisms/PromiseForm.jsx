import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { InputBox } from "../atoms/InputBox";
import StarIconUrl from "../../assets/StarIcon.svg";

/**
 * PromiseForm component for creating new promises.
 */
export const PromiseForm = ({ onPromiseCreated, className = "", ...props }) => {
  const [promise, setPromise] = useState("");

  const sectionGap = "gap-y-md md:gap-y-lg";
  const headingStyle = "font-display-sm md:font-display-md";
  const inputGap = "gap-y-xsm md:gap-y-md";

  // Wrapper for the Star Icon to be used as a component in Button
  const StarIcon = (props) => <img src={StarIconUrl} alt="Star" {...props} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPromiseCreated) {
      onPromiseCreated(promise);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-[343px] md:max-w-[684px] p-md md:p-lg flex flex-col items-center ${sectionGap} ${className}`}
      {...props}
    >
      <span className={`${headingStyle} w-full text-center text-content-base`}>
        What's your promise for today?
      </span>
      <div className="w-full h-[1px] bg-surface-200" />
      <div className={`flex flex-col items-center w-full ${inputGap}`}>
        <InputBox
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
   * Callback when the promise is submitted
   */
  onPromiseCreated: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
