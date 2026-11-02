# Zod Fundamentals

## What is Zod?

Zod is a TypeScript-first schema validation library. It helps you define a structure for your data and validate it at runtime before using it in your app.

This is useful for forms, API responses, configuration objects, and anything with user input.

```ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(0),
  email: z.string().email(),
});
```

## Installation

```bash
npm install zod
```

If you are using TypeScript, make sure your project has `strict` enabled in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Basic usage

A schema defines the rules that valid data must follow.

```ts
import { z } from "zod";

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  inStock: z.boolean(),
});
```

You can then validate data with `.parse()`.

```ts
const product = {
  id: 1,
  title: "Keyboard",
  inStock: true,
};

const result = productSchema.parse(product);
console.log(result.title); // "Keyboard"
```

If the data is invalid, `.parse()` throws an error.

```ts
productSchema.parse({
  id: "1",
  title: "Keyboard",
  inStock: true,
});
// throws ZodError
```

## Safe parsing

Use `.safeParse()` when you want to handle errors without throwing.

```ts
const parsed = productSchema.safeParse({
  id: "abc",
  title: "Keyboard",
  inStock: true,
});

if (!parsed.success) {
  console.log(parsed.error.issues);
}
```

This is very useful for form validation because the app can show messages instead of crashing.

## Common schema types

Zod includes many built-in validators:

```ts
const schema = z.object({
  name: z.string(),
  age: z.number().int().min(18),
  role: z.enum(["admin", "user"]),
  tags: z.array(z.string()),
  email: z.string().email().optional(),
});
```

## Inferring types

Zod can infer TypeScript types from your schema.

```ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

type User = z.infer<typeof userSchema>;

const user: User = {
  name: "Alice",
  age: 28,
};
```

## Summary

Zod is a simple way to validate runtime data with TypeScript-friendly schemas. The main ideas are:

- define a schema
- validate with `.parse()` or `.safeParse()`
- catch invalid data early
- infer TypeScript types from the schema

This makes it ideal for forms, API data, and app configuration.
