# Pinia Actions: Quick Summary

## What are actions in Pinia?

Actions are methods inside a Pinia store used to change state or perform logic. They are the place where you update data, call APIs, or trigger business logic.

```ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
```

## How do you access actions?

You call them from the store instance.

```ts
const counter = useCounterStore();

counter.increment();
```

This is the standard way to trigger state changes from components.

## When and how to use actions

Use actions when you need to:

- update state
- run logic before changing data
- call an API and then save the response
- keep store behaviour in one place

Example:

```ts
export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Guest",
    loading: false,
  }),
  actions: {
    async fetchUser() {
      this.loading = true;
      const response = await fetch("/api/user");
      const data = await response.json();
      this.name = data.name;
      this.loading = false;
    },
  },
});
```

Then in a component:

```ts
const user = useUserStore();
await user.fetchUser();
```

## Summary

Actions in Pinia are store methods for changing state and running logic. They are accessed through the store instance and are the best place to handle updates, async work, and app behaviour in a clean and reusable way.
