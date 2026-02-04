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
  safeWidthPx = 720,
  maxReachPx = 900,
  minReachPy = 50,
  maxReachPy = 800,
}) => {
  const animatedPromises = useMemo(() => {
    // 1. Shuffle content order
    const shuffled = [...promises].sort(() => Math.random() - 0.5);
    // 2. Create unique shuffled row indices to prevent vertical overlap
    const poolSize = promises.length;
    const rowIndices = Array.from({ length: poolSize }, (_, i) => i).sort(
      () => Math.random() - 0.5,
    );

    return shuffled.map((promise, index) => {
      // PERSISTENT POSITIONS
      const side = Math.random() > 0.5 ? 1 : -1;
      const minX = safeWidthPx / 2 + 60;
      const maxX = maxReachPx;
      const xOffset = side * (minX + Math.random() * (maxX - minX));

      // Unique row logic using new vertical reach props
      const rowHeight = (maxReachPy - minReachPy) / poolSize;
      const rowIndex = rowIndices[index];
      const yPos =
        minReachPy + rowIndex * rowHeight + Math.random() * rowHeight * 0.3;

      /**
       * CONCURRENCY & LOOP CONTROL
       * Rule: totalDuration = PoolSize * Gap.
       * Rule: Visible concurrency = ActivePercentage * PoolSize.
       */

      // DESKTOP: Slower movement, 4 concurrent visible.
      // Keyframes are 40% active. 4 visible / 10 pool = 40%.
      const gapD = 4; // New promise every 4s
      const durationD = poolSize * gapD; // 40s total loop
      const delayD = index * gapD;

      // MOBILE: Snappy 1-at-a-time.
      // Keyframes are 10% active. 1 visible / 10 pool = 10%.
      const gapM = 5; // New promise every 5s
      const durationM = poolSize * gapM; // 50s total loop
      const delayM = index * gapM;

      // DOFX
      const dist = Math.abs(xOffset);
      const blurAmount = Math.max(0, (dist - 400) / 600).toFixed(2);
      const opacityFactor = Math.max(0.6, 1 - dist / 3000).toFixed(2);

      return {
        ...promise,
        xOffset: `${xOffset}px`,
        yPos: `${yPos}px`,
        delayD: `${delayD}s`,
        delayM: `${delayM}s`,
        durationD: `${durationD}s`,
        durationM: `${durationM}s`,
        blur: blurAmount,
        opacity: opacityFactor,
      };
    });
  }, [promises, safeWidthPx, maxReachPx, minReachPy, maxReachPy]);

  return (
    <div
      className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] z-0 overflow-hidden pointer-events-none ${className}`}
    >
      <style>{`
        .promise-item {
          animation-duration: var(--duration-m);
          animation-delay: var(--delay-m);
          bottom: 120px;
          left: 50%;
        }
        @media (min-width: 768px) {
          .promise-item {
            animation-duration: var(--duration-d);
            animation-delay: var(--delay-d);
            bottom: var(--y-pos);
            left: calc(50% + var(--x-offset));
          }
        }
      `}</style>
      {animatedPromises.map((p, index) => (
        <div
          key={p.id || index}
          className="absolute animate-promise-float promise-item"
          style={{
            "--x-offset": p.xOffset,
            "--y-pos": p.yPos,
            "--depth-blur": `blur(${p.blur}px)`,
            "--depth-opacity": p.opacity,
            "--delay-d": p.delayD,
            "--delay-m": p.delayM,
            "--duration-d": p.durationD,
            "--duration-m": p.durationM,
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
  safeWidthPx: PropTypes.number,
  maxReachPx: PropTypes.number,
  minReachPy: PropTypes.number,
  maxReachPy: PropTypes.number,
};
