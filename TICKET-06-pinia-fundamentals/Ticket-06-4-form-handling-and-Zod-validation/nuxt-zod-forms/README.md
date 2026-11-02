# Nuxt 4 Form Validation with Zod

A Nuxt 4 training project focused on typed, reusable form validation using Zod. The app demonstrates how to define a single source of truth for form schemas, surface field-level errors in the UI, and validate the same data again on the server before accepting it.

**Ticket:** TICKET-06-4-form-handling-and-Zod-validation
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Zod

## Features

- Contact form with name, email, and message validation
- Register form with username, email, password, and confirm-password checks
- Shared Zod schemas stored in a central location for reuse across client and server
- Field-level validation feedback using `safeParse()` and `error.path`
- Cross-field validation via `.refine()` for password matching
- Server-side validation using the same contact schema in a Nuxt API endpoint
- Clear success and error states for form submission feedback

## Tech & Patterns Demonstrated

- **Zod 4:** schema definitions, `.refine()`, and TypeScript inference via `z.infer<typeof schema>`
- **Nuxt 4:** app pages, components, and server API routes
- **Typed form state:** `reactive` objects inferred from the schema
- **Client validation:** `schema.safeParse(form)` with field-level error mapping
- **Server validation:** `readBody(event)` + `contactSchema.safeParse(body)` in `server/api/contact.post.ts`
- **Shared validation contract:** schema source in `shared/schemas/` reused by both app and server code

## Project Structure

```text
nuxt-zod-forms/
├── app/
│   ├── components/
│   │   ├── ContactForm.vue
│   │   └── RegisterForm.vue
│   └── pages/
│       ├── contact.vue
│       ├── register.vue
│       └── index.vue
├── server/
│   └── api/
│       └── contact.post.ts
├── shared/
│   └── schemas/
│       └── index.ts
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
├── APPROACH.md
├── REPORT.md
├── TICKET.md
└── docs/
```

## Getting Started

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/contact`
- `http://localhost:3000/register`

## Type Checking

```bash
npm run typecheck
```

## Out of Scope

- VeeValidate or any external form library
- Multi-step or wizard-style forms
- Database persistence or user storage
- File upload validation

## Related Documents

- [`../TICKET.md`](../TICKET.md) — objective, acceptance criteria, and Definition of Done
- [`../APPROACH.md`](../APPROACH.md) — planned implementation and technical decisions
- [`../REPORT.md`](../REPORT.md) — completed work, screenshots, and evidence
