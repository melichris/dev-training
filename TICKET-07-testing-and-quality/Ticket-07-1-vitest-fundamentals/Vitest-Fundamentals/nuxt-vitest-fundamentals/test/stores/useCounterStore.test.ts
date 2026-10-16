import { describe, it, expect, beforeEach } from "vitest";
import { useCounterStore } from "../../app/stores/useCounterStore";
import { createPinia, setActivePinia } from "pinia";
describe("useCounterStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("should initialize the count to 0", () => {
    const counterStore = useCounterStore();
    expect(counterStore.count).toBe(0);
  });

  it("should increment the count by 1", () => {
    const counterStore = useCounterStore();
    counterStore.increment();
    expect(counterStore.count).toBe(1);
  });

  it("should double the count correctly", () => {
    const counterStore = useCounterStore();
    counterStore.increment();
    expect(counterStore.doubleCount).toBe(2);
  });
  it("should reset the count to 0", () => {
    const counterStore = useCounterStore();
    counterStore.increment();
    counterStore.reset();
    expect(counterStore.count).toBe(0);
  });
});
