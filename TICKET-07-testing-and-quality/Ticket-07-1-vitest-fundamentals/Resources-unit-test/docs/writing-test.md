# Writing Tests in Vitest

## Writing tests with `test` or `it`

Vitest gives you two common ways to define tests: `it()` and `test()`. They are effectively the same in practice, so pick the one that reads better for your code style.

```ts
import { it, expect } from "vitest";

it("returns a value", () => {
  expect(2 + 2).toBe(4);
});
```

This is the simplest building block of any test suite: a test describes behavior and verifies it with an assertion.

## Grouping tests with `describe`

When you have multiple related checks, group them together with `describe()` so the output is easier to read.

```ts
import { describe, it, expect } from "vitest";

describe("user profile logic", () => {
  it("formats the full name", () => {
    expect("Jane" + " " + "Doe").toBe("Jane Doe");
  });

  it("handles missing last name", () => {
    expect("Jane").toContain("Jane");
  });
});
```

This makes failing tests much easier to understand because they are organized by feature or module.

## What are test files and what patterns do we use?

Vitest looks for files matching common test patterns such as:

- `*.test.ts`
- `*.spec.ts`
- `__tests__/*`

A typical structure is:

```txt
src/
  utils/
    math.test.ts
  components/
    Button.spec.ts
```

The file name matters because Vitest uses it to decide what should be executed.

## Testing with TypeScript

Vitest supports TypeScript out of the box. This is useful for verifying code that relies on types and for catching mistakes earlier.

```ts
import { it, expect } from "vitest";

it("supports typed values", () => {
  const value: number = 10;
  expect(value).toBeGreaterThan(5);
});
```

If you are using TypeScript-heavy code, it is worth adding `tsconfig` support and using type-aware assertions when needed.

## Reading test output

When a test fails, Vitest shows you:

- which test failed
- the expected vs received values
- the file and line involved

Example:

```ts
import { it, expect } from "vitest";

it("adds numbers", () => {
  expect(1 + 1).toBe(3);
});
```

Output will clearly point out that the expected value was `3` but the received value was `2`.

This is one of the most important parts of testing: the output tells you exactly what broke, not just that something failed.

## Skipping and focusing tests

During development, you may want to temporarily skip a test or run only one important test.

```ts
import { describe, it, expect } from "vitest";

describe("checkout flow", () => {
  it("works", () => {
    expect(true).toBe(true);
  });

  it.skip("temporary disabled test", () => {
    expect(false).toBe(true);
  });

  it.only("runs only this one", () => {
    expect(1).toBe(1);
  });
});
```

- `it.skip()` skips a test
- `it.only()` runs only that test

These are extremely helpful for debugging, but they should not stay in production code unless intentionally kept.

## Summary

Good test writing is not just about assertions. It is about structure, clarity, and feedback. Use `describe` to organize cases, keep files consistent, read the output carefully, and use `skip`/`only` sparingly when debugging.
