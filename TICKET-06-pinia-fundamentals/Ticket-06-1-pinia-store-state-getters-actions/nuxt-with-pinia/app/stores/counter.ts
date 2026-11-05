import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: (): { step: number; count: number } => ({
    step: 1,
    count: 0,
  }),
  getters: {
    doubleCount: (state): number => state.count * 2,
    projectedCount: (state): number => state.count + state.step,
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementBy(amount: number) {
      if (!Number.isFinite(amount) || amount <= 0) return;
      this.count += amount;
    },
    incrementByStep() {
      this.incrementBy(this.step);
    },
  },
});
