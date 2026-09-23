# Pinia Store: Quick Summary

## What is a store in Pinia?

A Pinia store is a central place to keep shared state for your app. Instead of passing data through many components, you define a store once and use it anywhere in your Vue app.

Example:

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
  },
});
```

Then in a component:

```ts
const counter = useCounterStore();
counter.increment();
```

## Option Store

An option store uses an object-style syntax with `state`, `actions`, and `getters`.

Example:

```ts
export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Alice",
    age: 30,
  }),
  getters: {
    userLabel() {
      return `${this.name} (${this.age})`;
    },
  },
  actions: {
    setName(newName: string) {
      this.name = newName;
    },
  },
});
```

This style is easy to read and feels familiar if you have used Vuex before.

## Setup Store

A setup store is defined with a function. It gives more flexibility and works well with composition API patterns.

Example:

```ts
export const useCartStore = defineStore("cart", () => {
  const items = ref<string[]>([]);

  function addItem(item: string) {
    items.value.push(item);
  }

  function clear() {
    items.value = [];
  }

  return { items, addItem, clear };
});
```

This style feels more like normal Vue composition code.

## Difference between option stores and setup stores

- Option stores: object-based, simple, familiar, good for classic store patterns
- Setup stores: function-based, more flexible, better when you want composition API logic

In practice, both are valid. The choice depends on the style you prefer and the complexity of your store.

## Destructuring from a store

You should avoid destructuring a Pinia store directly because it breaks reactivity.

Wrong:

```ts
const { count, increment } = useCounterStore();
```

This can lose reactivity because the values are copied out.

Correct:

```ts
const counter = useCounterStore();

console.log(counter.count);
counter.increment();
```

If you need a property, access it from the store instance itself so Vue can keep tracking updates.

## Summary

A Pinia store is a shared reactive state container for your app. Use `defineStore()` to create it, then access it from components. Choose option stores for a familiar object style, setup stores for composition-style logic, and avoid destructuring the store instance so reactivity stays intact.
