import { describe, expect, test, it } from "vitest";
import { formatUsername, isValidId, clampNumber } from "../app/utils/helpers";
describe("helpers", () => {
  it("should trim whitespace", () => {
    expect(formatUsername("John")).toBe("john");
  });

  it("should return false for 0", () => {
    expect(isValidId(0)).toBe(false);
  });
  it("should return false for negative numbers", () => {
    expect(isValidId(-1)).toBe(false);
  });
  it("should return false for decimals", () => {
    expect(isValidId(1.5)).toBe(false);
  });

  it("should clamp below min", () => {
    expect(clampNumber(2, 5, 15)).toBe(5);
  });
  it("should clamp above max", () => {
    expect(clampNumber(20, 5, 15)).toBe(15);
  });
});
