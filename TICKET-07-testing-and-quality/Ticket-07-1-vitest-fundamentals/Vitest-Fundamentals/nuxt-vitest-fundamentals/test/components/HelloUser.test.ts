import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HelloUser from "../../app/components/HelloUser.vue";

describe("HelloUser", () => {
  it("renders greeting when show is true", () => {
    const wrapper = mount(HelloUser, {
      props: {
        name: "Chris",
        show: true,
      },
    });
    expect(wrapper.text()).toContain("Hello, Chris!");
  });
  it("does not render greeting when show is false", () => {
    const wrapper = mount(HelloUser, {
      props: {
        name: "Chris",
        show: false,
      },
    });
    expect(wrapper.find("p").exists()).toBe(false);
  });
  it("toggles visible text on button click", async () => {
    const wrapper = mount(HelloUser, {
      props: {
        name: "Chris",
        show: true,
      },
    });
    expect(wrapper.find("p").exists()).toBe(true);
    await wrapper.get("button").trigger("click");
    expect(wrapper.find("span").exists()).toBe(false);
  });
});
