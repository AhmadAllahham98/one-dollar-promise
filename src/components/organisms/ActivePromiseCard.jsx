import React from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";

/**
 * Card for the user's currently active promise on the dashboard.
 */
export const ActivePromiseCard = ({
  promiseText = "I promise to drink 2L of water today",
  daysStreak = 0,
  onKeep,
  onFail,
}) => {
  return (
    <div className="w-full max-w-[600px] bg-surface-200/40 backdrop-blur-xl border border-white/10 rounded-2xl p-lg flex flex-col gap-y-md shadow-2xl relative overflow-hidden group">
      {/* Subtle Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 blur-[80px] rounded-full group-hover:bg-accent/30 transition-colors duration-700" />

      <div className="flex flex-col gap-y-xsm relative z-10">
        <span className="text-white/40 font-interface-sm uppercase tracking-wider">
          Active Promise
        </span>
        <h2 className="font-display-md text-white leading-tight">
          "{promiseText}"
        </h2>
      </div>

      <div className="flex items-center gap-x-md relative z-10">
        <div className="flex flex-col">
          <span className="text-white/40 font-interface-sm">
            Current Streak
          </span>
          <span className="text-accent font-display-sm">{daysStreak} Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-md mt-md relative z-10">
        <Button variant="primary" onClick={onKeep} className="flex-1 !py-md">
          I Kept It
        </Button>
        <Button
          variant="secondary"
          onClick={onFail}
          className="flex-1 !py-md border-white/10 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
        >
          I Failed ($1)
        </Button>
      </div>
    </div>
  );
};

ActivePromiseCard.propTypes = {
  promiseText: PropTypes.string,
  daysStreak: PropTypes.number,
  onKeep: PropTypes.func,
  onFail: PropTypes.func,
};
