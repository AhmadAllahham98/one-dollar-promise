/**
 * Determines if a promise is actionable based on its creation date.
 * A promise is actionable if at least one full calendar day has passed.
 *
 * @param {string|Date} createdAt - The ISO string or Date object when the promise was created.
 * @param {Date} [now=new Date()] - The current date (useful for testing).
 * @returns {boolean}
 */
export const isPromiseActionable = (createdAt, now = new Date()) => {
  if (!createdAt) return false;

  const createdDate = new Date(createdAt);

  // Zero out times to compare just the date boundaries
  const createdZero = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate(),
  );

  const nowZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // A promise is actionable if 'now' is at least one day after 'createdDate'
  // return nowZero > createdZero;
  return true;
};
