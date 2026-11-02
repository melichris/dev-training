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
      const { $fetch } = useApi();
      const result =
        await $fetch<{ id: number; title: string }[]>("/api/posts");
      if (result.error) {
        this.status = "error";
        this.error = result.error;
        return;
      }
      this.posts = result.data!;
      this.status = "success";
    },
  },
});
