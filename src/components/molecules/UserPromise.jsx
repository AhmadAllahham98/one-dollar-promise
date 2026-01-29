import React from "react";
import PropTypes from "prop-types";

/**
 * User Promise component displays a user's avatar and their daily promise.
 * Built with Tailwind CSS.
 */
export const UserPromise = ({
  imageUrl = "https://i.pravatar.cc/150?u=1",
  promiseText = "I promise to keep my phone away during meals",
  ...props
}) => {
  return (
    <div
      className="inline-flex items-center p-xsm gap-xsm bg-surface-100 border-2 border-accent2 rounded-lg shadow-main"
      {...props}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-text-primary font-interface-sm truncate">
        {promiseText}
      </span>
    </div>
  );
};

UserPromise.propTypes = {
  /**
   * The URL of the user's avatar image
   */
  imageUrl: PropTypes.string.isRequired,
  /**
   * The promise text to display
   */
  promiseText: PropTypes.string.isRequired,
};
