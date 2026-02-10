import { describe, it, expect } from "vitest";
import { getAuthAction, AUTH_ACTION_TYPES } from "./authUtils";

describe("getAuthAction", () => {
  it("should return EXISTING_ACTIVE and discard pending if user has a DB promise", () => {
    const existing = [{ id: 1, content: "DB Promise" }];
    const pending = "Session Promise";

    const action = getAuthAction(existing, pending);

    expect(action.type).toBe(AUTH_ACTION_TYPES.EXISTING_ACTIVE);
    expect(action.shouldDiscardPending).toBe(true);
    expect(action.navigateTo).toBe("/promise-status");
  });

  it("should return MIGRATE_PENDING if no DB promise but session has one", () => {
    const existing = [];
    const pending = "Session Promise";

    const action = getAuthAction(existing, pending);

    expect(action.type).toBe(AUTH_ACTION_TYPES.MIGRATE_PENDING);
    expect(action.content).toBe("Session Promise");
    expect(action.navigateTo).toBe("/promise-status");
  });

  it("should return NAVIGATE_HOME if neither exist", () => {
    const existing = [];
    const pending = null;

    const action = getAuthAction(existing, pending);

    expect(action.type).toBe(AUTH_ACTION_TYPES.NAVIGATE_HOME);
    expect(action.navigateTo).toBe("/");
  });

  it("should return EXISTING_ACTIVE even if no pending promise exists", () => {
    const existing = [{ id: 1 }];
    const pending = null;

    const action = getAuthAction(existing, pending);

    expect(action.type).toBe(AUTH_ACTION_TYPES.EXISTING_ACTIVE);
    expect(action.shouldDiscardPending).toBe(false);
  });
});
