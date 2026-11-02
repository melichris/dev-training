import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import AsyncMessage from "../../app/components/AsyncMessage.vue";

describe("AsyncMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not display message before delay", async () => {
    const wrapper = mount(AsyncMessage);
    await wrapper.get("button").trigger("click");
    expect(wrapper.text()).not.toContain("Message loaded!");
  });

  it("should display message after delay with fake timers", async () => {
    const wrapper = mount(AsyncMessage);
    await wrapper.get("button").trigger("click");
    await vi.runAllTimersAsync();
    expect(wrapper.text()).toContain("Message loaded!");
  });
});
