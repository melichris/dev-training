import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
  }),
  getters: {
    themeLabel: (state) => (state.isDark ? "Dark" : "Light"),
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
});
