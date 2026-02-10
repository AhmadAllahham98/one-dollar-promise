export const AUTH_ACTION_TYPES = Object.freeze({
  EXISTING_ACTIVE: "EXISTING_ACTIVE",
  MIGRATE_PENDING: "MIGRATE_PENDING",
  NAVIGATE_HOME: "NAVIGATE_HOME",
});

/**
 * Determines the next action to take after a successful authentication,
 * based on whether the user has existing promises in the DB and if there's
 * a pending promise in session storage.
 *
 * @param {Array} existingPromises - Array of active promises from Supabase.
 * @param {string|null} pendingPromise - The content of a pending promise from sessionStorage.
 * @returns {Object} Action object with type, navigateTo, and metadata.
 */
export const getAuthAction = (existingPromises, pendingPromise) => {
  const hasExistingActive = existingPromises && existingPromises.length > 0;

  if (hasExistingActive) {
    return {
      type: AUTH_ACTION_TYPES.EXISTING_ACTIVE,
      shouldDiscardPending: !!pendingPromise,
      navigateTo: "/promise-status",
    };
  }

  if (pendingPromise) {
    return {
      type: AUTH_ACTION_TYPES.MIGRATE_PENDING,
      content: pendingPromise,
      navigateTo: "/promise-status",
    };
  }

  return {
    type: AUTH_ACTION_TYPES.NAVIGATE_HOME,
    navigateTo: "/",
  };
};
