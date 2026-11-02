# Ticket: Form Handling & Validation — Zod + Typed Forms in Nuxt 4

**Type:** Training / Skill Development
**Category:** Frontend — Nuxt 4 / TypeScript / Zod
**Project:** New dedicated Nuxt 4 project (`nuxt-zod-forms`)
**Status:** Awaiting QA review

## Description

Build competency in typed form handling and validation using Zod in a Nuxt 4 application. Define validation schemas that serve as a single source of truth for both client-side and server-side validation, catching invalid data at the form level before it reaches the API, and confirming it again on the server before processing.

## Context / Background

Prior tickets used manual validation logic (`validateInput` functions, `if (!form.name.trim())` checks) written by hand in each component. This approach doesn't scale: each form duplicates validation logic, rules can drift between client and server, and TypeScript has no way to infer form field types from the validation rules. Zod addresses all three: schemas are reusable, shareable across client and server, and TypeScript infers types directly from the schema definition.

VeeValidate (the other option on the Day 4 roadmap) is deliberately deferred — understanding what Zod does by itself first, before a form library abstracts it, is the same principle applied on every prior ticket (understand the mechanism, then use the tool that automates it).

## Detailed Description

### Core Features

**1. Zod schema definition**

- Define at least two schemas: a `contactSchema` (name, email, message) and a `registerSchema` (username, email, password, confirmPassword — with a cross-field refinement checking passwords match)
- Infer TypeScript types directly from schemas using `z.infer<typeof schema>`

**2. Client-side validation with `safeParse`**

- Build a contact form component using `reactive` state
- On submit, call `schema.safeParse(formData)` — never `schema.parse()`
- Extract field-level errors from `result.error.errors` using the `path` property
- Display errors next to the correct field, not just at the bottom of the form
- On success, clear the form and show a success message

**3. Cross-field validation**

- Use Zod's `.refine()` to validate that `password === confirmPassword` on the register schema
- Demonstrate that this is a schema-level rule, not manual comparison logic in the component

**4. Server-side validation using the same schema**

- Create a `server/api/contact.post.ts` endpoint that reads the POST body with `readBody(event)`
- Validate the body using the same `contactSchema` (shared from a common location)
- Return a typed error response if validation fails, or a success response if it passes
- Submit the form and confirm the server also validates — not just the client

**5. Shared schema location**

- Schemas live in `shared/schemas/` (or `app/schemas/`) — importable by both client components and server routes, enforcing consistent rules on both sides

### Technical Requirements

- Zod 4 (current stable version) — not Zod 3
- Types inferred from schemas with `z.infer<>`, never manually duplicated
- `safeParse` used exclusively — never `parse` (no unhandled throws in form logic)
- Field-level error display — errors shown next to the field that failed, not just a generic "form invalid" message
- Server endpoint validates independently of the client — not trusting client-side validation alone

### Out of Scope

- VeeValidate or any other form library (deferred to a later ticket)
- File upload validation
- Multi-step forms
- Database persistence (server route validates and returns a response, no storage)

## Acceptance Criteria

- [ ] Two Zod schemas defined (`contactSchema`, `registerSchema`) with TypeScript types inferred from them
- [ ] Contact form validates client-side with `safeParse`, showing field-level errors
- [ ] Cross-field password match validated via `.refine()` on the register schema
- [ ] Server API endpoint validates the same contact schema server-side
- [ ] Submitting invalid data to the server endpoint returns a typed validation error response
- [ ] Schemas are defined in one shared location, imported by both client and server
- [ ] No TypeScript errors (`vue-tsc --noEmit` clean)

## Risks & Open Points

- **Risk:** Using `schema.parse()` instead of `schema.safeParse()`, causing unhandled exceptions on invalid input.
  → **Mitigation:** `safeParse` exclusively — flagged as a hard rule from the start, not a preference.
- **Risk:** Duplicating schema definitions between client and server instead of sharing one.
  → **Mitigation:** Schemas defined once in `shared/` or `app/schemas/`, imported wherever needed.
- **Open Point:** Zod 4 changed some APIs from Zod 3 (e.g. error formatting) — confirm the installed version before implementation to avoid following outdated examples.

## Definition of Done

- [ ] Both forms implemented and manually tested (valid submission, each invalid field tested independently)
- [ ] Server endpoint tested via direct POST (e.g. browser DevTools or a form submit) with both valid and invalid data
- [ ] Code compiles with zero TypeScript errors
- [ ] Evidence captured (screenshots of field-level errors, success state, and server error response)
- [ ] Technical decisions and difficulties documented
- [ ] Code committed with clear, descriptive commit messages
