import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePostsStore } from "../../app/stores/usePostsStore";
import { createPinia, setActivePinia } from "pinia";
import { useApi } from "../../app/composables/useApi";

vi.mock("../../app/composables/useApi", () => ({
  useApi: vi.fn(() => ({
    $fetch: vi.fn().mockResolvedValue({
      data: [
        { id: 1, title: "Post One" },
        { id: 2, title: "Post Two" },
      ],
      error: null,
    }),
  })),
}));
describe("usePostsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize the posts store correctly", () => {
    const postsStore = usePostsStore();
    expect(postsStore.posts).toEqual([]);
    expect(postsStore.status).toBe("idle");
    expect(postsStore.error).toBeNull();
  });
  it("should handle successful fetchPosts call", async () => {
    const postsStore = usePostsStore();
    await postsStore.fetchPosts();
    expect(postsStore.status).toBe("success");
    expect(postsStore.posts.length).toBeGreaterThan(0);
  });

  it("should handle error", async () => {
    vi.mocked(useApi).mockReturnValueOnce({
      $fetch: vi
        .fn()
        .mockResolvedValue({ data: null, error: "Request failed" }),
    });
    const postsStore = usePostsStore();
    await postsStore.fetchPosts();
    expect(postsStore.status).toBe("error");
    expect(postsStore.error).toBe("Request failed");
  });
});
