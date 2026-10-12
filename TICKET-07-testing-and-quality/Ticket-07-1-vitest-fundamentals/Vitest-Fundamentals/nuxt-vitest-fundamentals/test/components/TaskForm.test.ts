import { mount } from "@vue/test-utils";
import TaskForm from "../../app/components/TaskForm.vue";
import { describe, it, expect } from "vitest";

describe("TaskForm", () => {
  it("renders the form correctly", () => {
    const wrapper = mount(TaskForm);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input#title").exists()).toBe(true);
    expect(wrapper.find("input#description").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });
  it("shows validation error when title is less than 3 characters", async () => {
    const wrapper = mount(TaskForm);

    await wrapper.find("input#title").setValue("Te");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find("p").text()).toBe(
      "Title must be at least 3 characters",
    );
  });

  it("emits submit event with form data when valid", async () => {
    const wrapper = mount(TaskForm);

    await wrapper.find("input#title").setValue("Test Task");
    await wrapper.find("input#description").setValue("Test Description");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0]).toEqual([
      "Test Task",
      "Test Description",
    ]);
  });
  it("emitted submit event payload should contain correct title", async () => {
    const wrapper = mount(TaskForm);

    await wrapper.find("input#title").setValue("Test Task");
    await wrapper.find("form").trigger("submit");

    const emittedEvent = wrapper.emitted("submit") as
      | [string, string][]
      | undefined;
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent?.[0]?.[0]).toBe("Test Task");
  });
});
