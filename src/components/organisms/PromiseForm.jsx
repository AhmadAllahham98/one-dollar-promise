import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { InputBox } from "../atoms/InputBox";
import StarIcon from "../../assets/StarIcon.svg";

/**
 * PromiseForm component for creating new promises.
 */
export const PromiseForm = ({ onPromiseSubmit, className = "", ...props }) => {
  const [promise, setPromise] = useState("");

  // Wrapper for the Star Icon to be used as a component in Button
  const Icon = (props) => <img src={StarIcon} alt="Star" {...props} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPromiseSubmit) {
      onPromiseSubmit(promise);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`card-container flex flex-col items-center section-gap ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center w-full gap-y-xsm md:gap-y-md">
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
          label="Promise?"
          iconRight={Icon}
        />
      </div>
    </form>
  );
};

PromiseForm.propTypes = {
  /**
   * Callback when the promise is submitted
   */
  onPromiseSubmit: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
