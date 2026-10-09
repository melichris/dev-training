import { describe, expect, it } from "vitest";
import { useCounter } from "../app/composables/useCounter";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    expect(useCounter().count.value).toBe(0);
  });
  it("should increment the count by 1", () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });
  it("should decrement the count by 1", () => {
    const { count, decrement } = useCounter();
    decrement();
    expect(count.value).toBe(-1);
  });
  it("should reset the count", () => {
    const { count, reset } = useCounter();
    reset();
    expect(count.value).toBe(0);
  });
});
