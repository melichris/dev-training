# Zod schemas: quick summary

A schema defines the expected structure and validation rules for data. In Zod, you create a schema and then parse or validate input against it.

## Core idea

```ts
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(0),
  email: z.email(),
  active: z.boolean().default(true),
});

const result = userSchema.safeParse({ name: "Ana", age: 27, email: "ana@test.com" });
```

- `parse()` throws on invalid input.
- `safeParse()` returns `{ success, data, error }` without throwing.

## Common primitive schemas

```ts
z.string();
z.number();
z.boolean();
z.bigint();
z.date();
z.null();
z.undefined();
z.literal("admin");
```

Use `z.enum([...])` for fixed string/numeric options and `z.literal(...)` for single exact values.

## Coercion

When form fields are strings, use coercion to convert values before validation:

```ts
z.coerce.string();
z.coerce.number();
z.coerce.boolean();
```

Example:

```ts
const ageSchema = z.coerce.number();
ageSchema.parse("42"); // 42
```

## String validation

Useful built-ins:

```ts
z.string().min(3);
z.string().max(20);
z.string().length(10);
z.string().regex(/^[a-z]+$/);
z.string().email();
z.string().url();
```

You can also normalize values:

```ts
z.string().trim();
z.string().toLowerCase();
z.string().toUpperCase();
```

## Objects and arrays

```ts
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  price: z.number().positive(),
});
```

Nested objects work the same way:

```ts
const orderSchema = z.object({
  user: z.object({ name: z.string() }),
  items: z.array(z.object({ sku: z.string(), qty: z.number().int() })),
});
```

## Union, optional, and default values

```ts
z.union([z.string(), z.number()]);
z.optional(z.string());
z.nullable(z.string());
z.default(z.string(), "guest");
```

These make schemas flexible for real-world form data.

## Custom validation

Use `.refine()` or `.transform()` when business rules are more specific:

```ts
const passwordSchema = z.string().min(8).refine((value) => /[A-Z]/.test(value));
```

## Rule of thumb

- Use `z.object()` for data objects.
- Use `z.array()` for lists.
- Use `z.enum()` / `z.literal()` for fixed allowed values.
- Use `z.coerce.*` for HTML/form input conversion.
- Use `safeParse()` for user input validation.

This is the minimum needed to define and validate schemas in Zod for forms and app data.
