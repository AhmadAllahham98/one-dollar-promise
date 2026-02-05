import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { UserPromise } from "../molecules/UserPromise";

// Default promises for the ambient background
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
 * Logic helper to calculate animation properties
 */
const calculatePromiseMetas = (promises, config) => {
  const { safeWidthPx, maxReachPx, minReachPy, maxReachPy } = config;
  const poolSize = promises.length;
  if (poolSize === 0) return [];

  // Create a stable shuffle of row indices
  const rowIndices = Array.from({ length: poolSize }, (_, i) => i).sort(
    () => 0.5 - Math.random(),
  );

  return promises.map((promise, index) => {
    const side = Math.random() > 0.5 ? 1 : -1;
    const minX = safeWidthPx / 2 + 60;
    const maxX = maxReachPx;
    const xOffset = side * (minX + Math.random() * (maxX - minX));

    const rowHeight = (maxReachPy - minReachPy) / poolSize;
    const yPos =
      minReachPy +
      rowIndices[index] * rowHeight +
      Math.random() * rowHeight * 0.3;

    // Concurrency Math
    const gapD = 4;
    const gapM = 5;

    const dist = Math.abs(xOffset);

    return {
      ...promise,
      id: promise.id || `promise-${index}`,
      styles: {
        "--x-offset": `${xOffset}px`,
        "--y-pos": `${yPos}px`,
        "--delay-d": `${index * gapD}s`,
        "--delay-m": `${index * gapM}s`,
        "--duration-d": `${poolSize * gapD}s`,
        "--duration-m": `${poolSize * gapM}s`,
        "--depth-blur": `blur(${Math.max(0, (dist - 400) / 600).toFixed(2)}px)`,
        "--depth-opacity": Math.max(0.6, 1 - dist / 3000).toFixed(2),
      },
    };
  });
};

/**
 * Ambient display of user promises that float in the background.
 */
export const UserPromiseDisplay = ({
  promises = DEFAULT_PROMISES,
  className = "",
  safeWidthPx = 720,
  maxReachPx = 900,
  minReachPy = 50,
  maxReachPy = 800,
}) => {
  const animatedPromises = useMemo(
    () =>
      calculatePromiseMetas(promises, {
        safeWidthPx,
        maxReachPx,
        minReachPy,
        maxReachPy,
      }),
    [promises, safeWidthPx, maxReachPx, minReachPy, maxReachPy],
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    >
      {animatedPromises.map((p) => (
        <div
          key={p.id}
          className="promise-item absolute animate-promise-float"
          style={p.styles}
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
  safeWidthPx: PropTypes.number,
  maxReachPx: PropTypes.number,
  minReachPy: PropTypes.number,
  maxReachPy: PropTypes.number,
};
