import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
  state: (): { isDark: boolean } => ({
    isDark: false,
  }),
  getters: {
    themeLabel: (state): "Dark" | "Light" => (state.isDark ? "Dark" : "Light"),
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
});
