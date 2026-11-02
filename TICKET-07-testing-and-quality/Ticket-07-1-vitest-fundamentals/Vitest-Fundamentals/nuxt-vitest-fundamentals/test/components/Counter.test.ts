import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Counter from "../../app/components/Counter.vue";

describe("Counter", () => {
  it("increments the count when the button is clicked", async () => {
    const wrapper = mount(Counter);
    await wrapper.get("button").trigger("click");
    expect(wrapper.text()).toContain("Count: 1");
  });
  it("emits increment event with payload 1 after first click", async () => {
    const wrapper = mount(Counter);
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("increment")).toEqual([[1]]);
  });
  it("emits increment event with payload 2 after second click", async () => {
    const wrapper = mount(Counter);
    await wrapper.get("button").trigger("click");
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("increment")).toEqual([[1], [2]]);
  });
});
