# Component Testing with Vitest

## What is component testing?

Component testing means testing a UI component the same way a user would interact with it. Instead of only checking raw functions, you render a component and verify its behavior in the browser-like environment.

This is especially useful in Vue apps, where user interfaces often involve props, events, conditional rendering, and DOM updates.

```ts
import { render, screen, fireEvent } from "@testing-library/vue";
import Counter from "./Counter.vue";

it("increments the value when clicked", async () => {
  render(Counter);

  const button = screen.getByRole("button", { name: "Increase" });
  await fireEvent.click(button);

  expect(screen.getByText("1")).toBeTruthy();
});
```

## Why component testing?

Component tests catch issues that unit tests miss. A function may work correctly, but the UI can still break because of:

- wrong rendering
- missing text
- broken event handlers
- conditional logic not responding as expected

Component testing gives you confidence that the feature works from the user's perspective.

## Component testing strategy

A strong strategy is to test the behavior, not the internal implementation. Focus on what the user can see and do:

- render the component
- find elements by role/text
- trigger interactions
- assert the updated UI

This keeps tests stable and less fragile than checking internal state or method calls.

## Best practices

- Test behavior, not implementation details
- Prefer accessible selectors like role and label
- Keep tests small and focused on one behavior
- Reuse realistic user interactions instead of manipulating internals
- Avoid over-mocking; test the real rendered component when possible

Example:

```ts
const button = screen.getByRole("button", { name: "Submit" });
await fireEvent.click(button);
expect(screen.getByText("Submitted")).toBeTruthy();
```

This is much more valuable than asserting that a method was called internally.

## Advanced testing patterns

As projects grow, component tests often cover more advanced cases such as:

- props and default values
- emitted events
- async behavior and loading states
- keyboard interactions
- form validation
- conditional rendering

Example with emitted events:

```ts
import { mount } from "@vue/test-utils";

it("emits submit when form is valid", async () => {
  const wrapper = mount(FormComponent);

  await wrapper.find("input").setValue("hello@example.com");
  await wrapper.find("form").trigger("submit");

  expect(wrapper.emitted("submit")).toBeTruthy();
});
```

These patterns make sure your component behaves correctly in real-world scenarios.

## Debugging component tests

When a component test fails, the key is to inspect what was rendered and why. Common debugging steps include:

- print the HTML output
- confirm the correct element is being found
- check async behavior and waiting for DOM updates
- verify props and state are being passed correctly

Example:

```ts
console.log(wrapper.html());
```

This often reveals whether the component rendered as expected or if the UI is in the wrong state.

## Summary

Component testing is about validating the UI behavior users rely on. It helps you catch rendering issues, interaction bugs, and logic mistakes before they reach production. The best tests are accessible, user-focused, and easy to debug.
