# Pinia State: Quick Summary

## What is a Pinia state?

A Pinia state is the reactive data inside a store. It holds the app’s shared values, like counts, forms, user data, or selected filters.

```ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    name: "Alice",
  }),
});
```

## How do we access the state?

We access it from the store instance.

```ts
const counter = useCounterStore();

console.log(counter.count);
counter.count++;
```

This is reactive, so Vue updates components when the state changes.

## Resetting the state

You can reset the state back to its original values.

```ts
const counter = useCounterStore();

counter.$reset();
```

This restores the state to the initial values defined in `state()`.

## Modifiable state and form data

State is meant to be changed, especially for form data or UI-driven values.

```ts
const profile = useProfileStore();

profile.firstName = "Sam";
profile.email = "sam@example.com";
```

This is useful for forms because the input values can live in the store and stay reactive.

## Mutating the state with `$patch`

`$patch` lets you change multiple state properties in one go.

```ts
const counter = useCounterStore();

counter.$patch({
  count: counter.count + 1,
  name: "Bob",
});
```

This is useful when you want to update several values together.

## Important note

You cannot add a brand-new property later if it was not defined in `state()`.

```ts
const counter = useCounterStore();

counter.secondCount = 2; // ❌ not allowed if secondCount was never defined
```

Instead, define it first:

```ts
state: () => ({
  count: 0,
  secondCount: 0,
});
```

## Subscribing to the state

You can listen for changes in a store.

```ts
const counter = useCounterStore();

counter.$subscribe((mutation, state) => {
  console.log("State changed:", mutation, state);
});
```

This is helpful for debugging, syncing with local storage, or reacting to changes.

## Summary

A Pinia state is the reactive data stored in a Pinia store. Access it through the store instance, update it directly or with `$patch`, reset it with `$reset()`, and remember that every property must be declared in `state()` before it can be used.
