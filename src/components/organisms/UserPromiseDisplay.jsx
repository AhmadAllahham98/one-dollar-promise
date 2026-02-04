import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { UserPromise } from "../molecules/UserPromise";

const DEFAULT_PROMISES = [
  {
    id: 1,
    imageUrl: "https://i.pravatar.cc/150?u=11",
    promiseText: "I promise to drink 2L of water today",
  },
  {
    id: 2,
    imageUrl: "https://i.pravatar.cc/150?u=22",
    promiseText: "I promise to finish my project",
  },
  {
    id: 3,
    imageUrl: "https://i.pravatar.cc/150?u=33",
    promiseText: "I promise to go for a run",
  },
  {
    id: 4,
    imageUrl: "https://i.pravatar.cc/150?u=44",
    promiseText: "I promise to meditate for 10 mins",
  },
  {
    id: 5,
    imageUrl: "https://i.pravatar.cc/150?u=55",
    promiseText: "I promise to read 20 pages",
  },
  {
    id: 6,
    imageUrl: "https://i.pravatar.cc/150?u=66",
    promiseText: "I promise to sleep by 11 PM",
  },
  {
    id: 7,
    imageUrl: "https://i.pravatar.cc/150?u=77",
    promiseText: "I promise to eat no junk food",
  },
  {
    id: 8,
    imageUrl: "https://i.pravatar.cc/150?u=88",
    promiseText: "I promise to learn something new",
  },
  {
    id: 9,
    imageUrl: "https://i.pravatar.cc/150?u=99",
    promiseText: "I promise to be more patient",
  },
  {
    id: 10,
    imageUrl: "https://i.pravatar.cc/150?u=100",
    promiseText: "I promise to call a friend",
  },
];

export const UserPromiseDisplay = ({
  promises = DEFAULT_PROMISES,
  className = "",
}) => {
  const animatedPromises = useMemo(() => {
    // Shuffle logic
    const shuffledIndices = Array.from(
      { length: promises.length },
      (_, i) => i,
    );
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [
        shuffledIndices[j],
        shuffledIndices[i],
      ];
    }

    return promises.map((promise, index) => {
      const orderIndex = shuffledIndices[index];

      // Desktop grid logic
      const zoneRows = 2;
      const zoneCols = Math.ceil(promises.length / zoneRows);
      const zoneWidth = 100 / zoneCols;

      const row = Math.floor(index / zoneCols);
      const col = index % zoneCols;

      // Position calculations
      const left = col * zoneWidth + (Math.random() * 0.4 + 0.3) * zoneWidth;
      const rowHeight = 80;
      const desktopBottom =
        row * rowHeight + (Math.random() * 0.4 + 0.3) * rowHeight;

      // Mobile logic
      const mRow = orderIndex % 4;
      const mobileRowHeight = 50;
      const mobileBottom = (mRow + 0.5) * mobileRowHeight;
      const mLeft = 50;

      /**
       * DEPTH CALCULATIONS
       * Distance from center (50%) determines the blur and scale.
       */
      const distanceFromCenter = Math.abs(left - 50);
      // Items at the very edge (50% away from center) get max blur/min scale
      const blurAmount = (distanceFromCenter / 40).toFixed(2);
      const scaleAmount = 1 - distanceFromCenter / 150;
      // Slightly dim the ones at the very edges to enhance depth
      const focusOpacity = 1 - distanceFromCenter / 200;

      return {
        ...promise,
        dBottom: `${desktopBottom}px`,
        dLeft: `${left}%`,
        mBottom: `${mobileBottom}px`,
        mLeft: `${mLeft}%`,
        delay: `${orderIndex * 2}s`,
        duration: "20s",
        depthStyles: {
          filter: `blur(${blurAmount}px)`,
          transform: `translate(-50%, 50%) scale(${scaleAmount})`,
          opacity: focusOpacity,
        },
      };
    });
  }, [promises]);

  return (
    <div
      className={`w-full flex-1 overflow-hidden md:overflow-visible relative bg-transparent ${className}`}
    >
      {animatedPromises.map((p, index) => (
        <div
          key={p.id || index}
          className="absolute animate-promise-float pointer-events-none bottom-[var(--m-bottom)] left-[var(--m-left)] md:bottom-[var(--d-bottom)] md:left-[var(--d-left)]"
          style={{
            "--m-bottom": p.mBottom,
            "--m-left": p.mLeft,
            "--d-bottom": p.dBottom,
            "--d-left": p.dLeft,
            animationDelay: p.delay,
            animationDuration: p.duration,
            // Apply the depth-of-field styles
            ...p.depthStyles,
          }}
        >
          <UserPromise imageUrl={p.imageUrl} promiseText={p.promiseText} />
        </div>
      ))}
    </div>
  );
};

UserPromiseDisplay.propTypes = {
  promises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imageUrl: PropTypes.string.isRequired,
      promiseText: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};
