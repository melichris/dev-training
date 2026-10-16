import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    step: 1,
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    projectedCount: (state) => state.count + state.step,
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementBy(amount: number) {
      this.count += amount;
    },
    incrementByStep() {
      this.incrementBy(this.step);
    },
  },
});
