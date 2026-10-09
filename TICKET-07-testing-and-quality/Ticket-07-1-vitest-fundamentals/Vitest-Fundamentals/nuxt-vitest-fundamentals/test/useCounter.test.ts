import { describe, expect, it } from "vitest";
import { createApp } from "vue";

function withSetup<T>(composable: () => T): T {
  let result: T;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });
  app.mount(document.createElement("div"));
  return result!;
}

describe("useCounter", () => {
  it("should initialize with default value 0", () => {
    const { count } = withSetup(() => useCounter());
    expect(count.value).toBe(0);
  });
  it("should increment the count by 1", () => {
    const { count, increment } = withSetup(() => useCounter());
    increment();
    expect(count.value).toBe(1);
  });
  it("should decrement the count by 1", () => {
    const { count, decrement } = withSetup(() => useCounter());
    decrement();
    expect(count.value).toBe(-1);
  });
  it("should reset the count", () => {
    const { count, reset } = withSetup(() => useCounter());
    reset();
    expect(count.value).toBe(0);
  });
});
