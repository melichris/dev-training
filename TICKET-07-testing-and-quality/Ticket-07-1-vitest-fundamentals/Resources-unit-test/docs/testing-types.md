# Testing Types and Type Checking

## Testing types

Type testing is about making sure values and variables have the expected types. In TypeScript-heavy projects, that helps prevent bugs before runtime.

Vitest supports type assertions with helpers like `expectTypeOf`.

```ts
import { it, expectTypeOf } from "vitest";

it("keeps the correct type", () => {
  const value = 42;
  expectTypeOf(value).toEqualTypeOf<number>();
});
```

This is useful when you want to confirm that a function returns the right type or that a value matches your type expectations.

## Reading errors

When TypeScript or Vitest reports an error, the first job is to read the message carefully. Most errors tell you:

- where the issue happened
- what type was expected
- what type was actually received

Example:

```ts
const total: number = "10";
```

This fails because a string cannot be assigned to a number. The error explains the mismatch clearly, and that is the clue you need to fix it.

A good habit is to read the error message first before changing code. It often points directly to the real problem.

## Run type checking

Type checking is separate from runtime tests. It ensures the project is valid from a TypeScript perspective, even before execution.

```bash
npx tsc --noEmit
```

This command checks your code without emitting build files. It is extremely helpful in larger codebases where a simple runtime test is not enough.

You can also add this to your package scripts:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

## Summary

Testing types is part of building reliable software. It helps catch bad assignments, mismatches, and invalid data early. Reading errors correctly and running type checks regularly keeps your app stable and easier to maintain.
