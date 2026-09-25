import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    name: "",
  }),
  getters: {},
  actions: {
    login(name: string) {
      this.isLoggedIn = true;
      this.name = name;
    },
    logout() {
      this.$reset();
    },
  },
});
