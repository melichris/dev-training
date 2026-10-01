# Nuxt Form Validation with Zod

## Why use Zod for forms?

Zod helps validate form input before it is sent to the server or stored in state. It gives you a clean way to define validation rules and show friendly error messages.

## Installation

```bash
npm install zod
```

If you are using form libraries such as VeeValidate, you may also install the matching Zod integration package.

## Basic example

```ts
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
```

This schema says:

- email must be a valid email string
- password must be at least 8 characters long

## Validating form data

```ts
const form = {
  email: "user@example.com",
  password: "secret123",
};

const result = loginSchema.safeParse(form);

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log("Form is valid");
}
```

## Example in a Nuxt component

```ts
<script setup lang="ts">
import { z } from "zod";

const form = reactive({
  email: "",
  password: "",
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function submitForm() {
  const result = loginSchema.safeParse(form);

  if (!result.success) {
    console.log(result.error.issues);
    return;
  }

  console.log("Submit data:", result.data);
}
</script>
```

## Type inference

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginForm = z.infer<typeof schema>;
```

This helps TypeScript know exactly what shape the data should have.

## Summary

Zod is a lightweight and practical way to validate forms in Nuxt. Define a schema, run `safeParse()`, and react to validation errors in a structured way.
