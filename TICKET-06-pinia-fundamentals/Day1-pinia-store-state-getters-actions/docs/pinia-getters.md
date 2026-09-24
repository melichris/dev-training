# Pinia Getters: Quick Summary

## What are getters in Pinia?

Getters are like computed values for a Pinia store. They derive data from the store state and stay reactive.

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    firstName: "Jane",
    lastName: "Doe",
  }),
  getters: {
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});
```

Then access it like this:

```ts
const user = useUserStore();
console.log(user.fullName);
```

## Syntax

Getters are defined inside the store under `getters`. They are similar to computed properties in Vue.

```ts
getters: {
  doubleCount(): number {
    return this.count * 2
  },
}
```

They should be used for derived values, not for mutating state.

## Accessing other getters

Inside a getter, you can access other getters using `this`.

```ts
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 2,
  }),
  getters: {
    doubled(): number {
      return this.count * 2;
    },
    tripled(): number {
      return this.doubled * 3;
    },
  },
});
```

This makes it easy to build computed values from other derived values.

## Passing arguments to getters

By default, getters are not functions you call with arguments. If you want to pass an argument, create a function inside the getter.

```ts
getters: {
  getUserById(): (id: number) => string | undefined {
    return (id: number) => this.users.find(user => user.id === id)?.name
  },
}
```

Then:

```ts
const user = useUserStore();
console.log(user.getUserById(3));
```

## When do we use `storeToRefs`?

Use `storeToRefs` when you want to destructure state or getters into reactive refs in a component.

```ts
import { storeToRefs } from "pinia";

const user = useUserStore();
const { fullName, count } = storeToRefs(user);
```

This is helpful because normal destructuring can break reactivity.

## Summary

Getters in Pinia are computed values derived from the store state. They are defined in `getters`, can access other getters through `this`, and are useful for readable derived logic. If you need to use state/getters in a component without losing reactivity, use `storeToRefs`.
