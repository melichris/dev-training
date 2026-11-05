import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePostsStore } from "../../app/stores/usePostsStore";
import { createPinia, setActivePinia } from "pinia";
import { useApi } from "../../app/composables/useApi";

vi.mock("../../app/composables/useApi", () => ({
  useApi: vi.fn(),
}));
describe("usePostsStore", () => {
  const mockedFetch = vi.fn();

  beforeEach(() => {
    setActivePinia(createPinia());
    mockedFetch.mockReset();
    vi.mocked(useApi).mockReturnValue({ $fetch: mockedFetch });
  });

  it("should initialize the posts store correctly", () => {
    const postsStore = usePostsStore();
    expect(postsStore.posts).toEqual([]);
    expect(postsStore.status).toBe("idle");
    expect(postsStore.error).toBeNull();
  });
  it("should handle successful fetchPosts call", async () => {
    mockedFetch.mockResolvedValue({
      data: [
        { id: 1, title: "Post One" },
        { id: 2, title: "Post Two" },
      ],
      error: null,
    });
    const postsStore = usePostsStore();
    await postsStore.fetchPosts();
    expect(postsStore.status).toBe("success");
    expect(postsStore.posts).toEqual([
      { id: 1, title: "Post One" },
      { id: 2, title: "Post Two" },
    ]);
  });

  it("should handle a rejected API request", async () => {
    mockedFetch.mockRejectedValue(new Error("Network unavailable"));
    const postsStore = usePostsStore();
    await postsStore.fetchPosts();
    expect(postsStore.status).toBe("error");
    expect(postsStore.error).toBe("Network unavailable");
    expect(postsStore.posts).toEqual([]);
  });

  it("should handle an error result returned by the API wrapper", async () => {
    mockedFetch.mockResolvedValue({ data: null, error: "Request failed" });
    const postsStore = usePostsStore();
    await postsStore.fetchPosts();
    expect(postsStore.status).toBe("error");
    expect(postsStore.error).toBe("Request failed");
  });
});
