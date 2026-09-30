import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import type { Status, User } from "~/types/api";

export const useUsersStore = defineStore("users", {
  state: () => ({
    status: "loading" as Status,
    users: null as User[] | null,
  }),
  actions: {
    async fetchUsers() {
      this.status = "loading";
      const { data, error } = await useApi<User[]>("/api/users");
      if (error) {
        this.status = "error";
        return;
      }
      this.users = data;
      this.status = "success";
    },
  },
});
