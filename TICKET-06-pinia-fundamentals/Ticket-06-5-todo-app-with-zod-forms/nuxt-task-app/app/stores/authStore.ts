import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import type { LoginForm } from "~~/shared/schemas/index";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as { token: string; username: string } | null,
    status: "idle" as "idle" | "loading" | "error",
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(credentials: LoginForm) {
      this.status = "loading";
      const { data, error } = await useApi<{ token: string; username: string }>(
        "/api/auth/login",
        {
          method: "POST",
          body: credentials,
        },
      );
      if (error) {
        this.status = "error";
        return error;
      }
      this.user = data;
      this.status = "idle";
    },
    logout() {
      this.user = null;
      this.status = "idle";
    },
  },
  persist: true,
});
