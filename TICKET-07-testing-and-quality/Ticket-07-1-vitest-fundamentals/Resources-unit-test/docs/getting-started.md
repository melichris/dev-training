# Getting Started with Vitest

## What is Vitest?

Vitest is a modern test runner built for JavaScript and TypeScript apps. It is especially popular in Vue and Vite projects because it feels familiar to developers who already use Vite, and it runs fast enough for a smooth developer experience.

Think of it as the tool that helps you check whether your code still works after changes. You write tests once, then run them to verify behavior quickly.

```ts
import { describe, it, expect } from "vitest";

describe("sum", () => {
  it("adds numbers correctly", () => {
    expect(1 + 2).toBe(3);
  });
});
```

## Installation

Install Vitest as a dev dependency in your project:

```bash
npm install -D vitest
```

If you are using a Vite app, this is usually enough to start writing tests. You can also add a script in your package.json:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## How to write a test file

Vitest test files usually end with `.test.ts` or `.spec.ts`. A simple test file looks like this:

```ts
import { describe, it, expect } from "vitest";

describe("calculator", () => {
  it("multiplies numbers", () => {
    expect(3 * 4).toBe(12);
  });
});
```

The pattern is simple:

- `describe()` groups related tests
- `it()` or `test()` defines a single test
- `expect()` checks the result

## How do we execute our tests?

Run the full test suite:

```bash
npx vitest run
```

Run in watch mode while developing:

```bash
npx vitest
```

This is useful because as you edit files, Vitest can rerun tests automatically.

## How to configure Vitest

Vitest can be configured in `vitest.config.ts` or inside your Vite config. Typical configuration includes test environment, globals, and coverage settings.

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});
```

This lets you use `describe`, `it`, and `expect` without importing them every time.

## What is REST parameter syntax?

REST parameters allow a function to accept an unlimited number of arguments and collect them into an array.

```ts
function sum(...numbers: number[]) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

This is useful when writing flexible helper functions or dynamic test data setups.

## Parameterized tests

Parameterized tests, also called table-driven tests, let you run the same test with multiple inputs.

```ts
import { it, expect } from "vitest";

it.each([
  [1, 2, 3],
  [2, 3, 5],
  [10, 5, 15],
])("adds %i and %i to equal %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

This avoids repeating the same logic for many cases.

## Using global imports

If you enable `globals: true`, you do not need to import `describe`, `it`, and `expect` in every file.

```ts
describe("example", () => {
  it("works", () => {
    expect(2 + 2).toBe(4);
  });
});
```

This can make test files shorter and easier to read, but it is a matter of preference. Many teams still prefer explicit imports for clarity.

## Summary

Vitest gives you a fast and simple testing setup for modern web apps. The core ideas are:

- install it
- create `.test` files
- write assertions
- run tests with `vitest`
- configure it when needed
- use parameterization and globals to keep things clean
