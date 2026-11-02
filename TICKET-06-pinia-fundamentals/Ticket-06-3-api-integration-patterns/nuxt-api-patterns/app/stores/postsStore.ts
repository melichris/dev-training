import { defineStore } from "pinia";
import type { Post, Status } from "~/types/api";
import { useApi } from "~/composables/useApi";

export const usePostStore = defineStore("posts", {
  state: () => ({
    status: "loading" as Status,
    posts: null as Post[] | null,
  }),
  actions: {
    async fetchPosts() {
      this.status = "loading";
      const { data, error } = await useApi<Post[]>("/api/posts");
      if (error) {
        this.status = "error";
        return;
      }
      this.posts = data;
      this.status = "success";
    },
  },
});
