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

/**
 * UserPromiseDisplay organism displays a decorative, animated cloud of user promises.
 * Each promise fades in, stays for a moment, and fades out at a random position.
 */
export const UserPromiseDisplay = ({
  promises = DEFAULT_PROMISES,
  className = "",
}) => {
  const animatedPromises = useMemo(() => {
    // Create an array of shuffled indices to randomize the appearance order
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
      // Use the shuffled index for the delay to randomize order
      const orderIndex = shuffledIndices[index];

      // Desktop zones - Use original index so position is independent of appearance order (more organic cloud)
      const zoneRows = 2;
      const zoneCols = Math.ceil(promises.length / zoneRows);
      const zoneWidth = 100 / zoneCols;
      const zoneHeight = 100 / zoneRows;

      const row = Math.floor(index / zoneCols);
      const col = index % zoneCols;

      // Reduced jitter for desktop to prevent overlap between adjacent zones
      const top = row * zoneHeight + (Math.random() * 0.4 + 0.3) * zoneHeight;
      const left = col * zoneWidth + (Math.random() * 0.4 + 0.3) * zoneWidth;

      // Mobile zones (1 col, 4 rows) - 2s stagger + 4 rows prevents loop overlap
      const mRow = orderIndex % 4;
      const mZoneHeight = 100 / 4;
      const mTop = (mRow + 0.5) * mZoneHeight; // Perfectly centered in the row
      const mLeft = 50; // Centered horizontally in the single column

      // Safe bounds
      const safeTop = Math.max(10, Math.min(90, top));
      const safeLeft = Math.max(10, Math.min(90, left));
      const safeMTop = Math.max(10, Math.min(90, mTop));

      return {
        ...promise,
        dTop: `${safeTop}%`,
        dLeft: `${safeLeft}%`,
        mTop: `${safeMTop}%`,
        mLeft: `${mLeft}%`,
        delay: `${orderIndex * 2}s`,
        duration: "20s",
      };
    });
  }, [promises]);

  return (
    <div className={`w-full h-[240px] relative bg-transparent ${className}`}>
      {animatedPromises.map((p, index) => (
        <div
          key={p.id || index}
          className="absolute opacity-0 animate-promise-float pointer-events-none top-[var(--m-top)] left-[var(--m-left)] md:top-[var(--d-top)] md:left-[var(--d-left)]"
          style={{
            "--m-top": p.mTop,
            "--m-left": p.mLeft,
            "--d-top": p.dTop,
            "--d-left": p.dLeft,
            transform: "translate(-50%, -50%)",
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <UserPromise imageUrl={p.imageUrl} promiseText={p.promiseText} />
        </div>
      ))}
    </div>
  );
};

UserPromiseDisplay.propTypes = {
  /**
   * Array of promise objects containing id, imageUrl, and promiseText
   */
  promises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imageUrl: PropTypes.string.isRequired,
      promiseText: PropTypes.string.isRequired,
    }),
  ),
  /**
   * Optional additional class names for the container
   */
  className: PropTypes.string,
};
