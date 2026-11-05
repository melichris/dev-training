import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as { id: number; title: string }[],
    status: "idle" as "idle" | "loading" | "success" | "error",
    error: null as string | null,
  }),
  actions: {
    async fetchPosts() {
      this.status = "loading";
      this.error = null;
      const { $fetch } = useApi();
      try {
        const result =
          await $fetch<{ id: number; title: string }[]>("/api/posts");
        if (result.error) {
          throw new Error(result.error);
        }
        if (result.data === null) {
          throw new Error("Request returned no posts.");
        }

        this.posts = result.data;
        this.status = "success";
      } catch (error) {
        this.status = "error";
        this.error =
          error instanceof Error ? error.message : "Request failed";
      }
    },
  },
});
