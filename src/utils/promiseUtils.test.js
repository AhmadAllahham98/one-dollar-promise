import { describe, it, expect } from "vitest";
import { isPromiseActionable } from "./promiseUtils";

describe("isPromiseActionable", () => {
  it("should return false if no createdAt date is provided", () => {
    expect(isPromiseActionable(null)).toBe(false);
    expect(isPromiseActionable(undefined)).toBe(false);
  });

  it("should return false if the promise was created today", () => {
    // Both on Feb 10
    const now = new Date(2026, 1, 10, 12, 0);
    const createdAt = new Date(2026, 1, 10, 8, 0).toISOString();
    expect(isPromiseActionable(createdAt, now)).toBe(false);
  });

  it("should return true if the promise was created yesterday", () => {
    // Now is Feb 10, Created is Feb 9
    const now = new Date(2026, 1, 10, 12, 0);
    const createdAt = new Date(2026, 1, 9, 23, 59).toISOString();
    expect(isPromiseActionable(createdAt, now)).toBe(true);
  });

  it("should return true if the promise was created several days ago", () => {
    const now = new Date(2026, 1, 10, 12, 0);
    const createdAt = new Date(2026, 1, 1, 12, 0).toISOString();
    expect(isPromiseActionable(createdAt, now)).toBe(true);
  });

  it("should handle different timezones by only comparing calendar dates", () => {
    const now = new Date(2026, 1, 10, 0, 1); // Feb 10, 00:01 AM
    const createdAt = new Date(2026, 1, 9, 23, 59).toISOString(); // Feb 9, 11:59 PM
    expect(isPromiseActionable(createdAt, now)).toBe(true);
  });
});
