# Implementation Approach — Form Handling & Validation with Zod

**Ticket:** TICKET-09-form-validation-zod
**Project:** `nuxt-zod-forms` (new, dedicated Nuxt 4 project)

## Planned Approach

1. **Scaffold and install** — `npx nuxi@latest init nuxt-zod-forms`, then `npm install zod`. No Pinia needed for this ticket — forms are self-contained. Initial commit before any feature work.

2. **Define schemas in a shared location** — create `shared/schemas/index.ts` (Nuxt's `shared/` directory is accessible to both `app/` client code and `server/` routes, making it the correct place for shared validation logic):
   - `contactSchema`: `name` (string, min 2 chars), `email` (valid email format), `message` (string, min 10 chars)
   - `registerSchema`: `username` (string, min 3 chars), `email` (valid email), `password` (string, min 8 chars), `confirmPassword` (string) — with a `.refine()` cross-field check that `password === confirmPassword`
   - Export TypeScript types inferred from each schema: `type ContactForm = z.infer<typeof contactSchema>`

3. **Contact form component** — `app/components/ContactForm.vue`:
   - `reactive` form state typed as `ContactForm`
   - A `ref` for field-level errors (an object keyed by field name)
   - On submit: call `contactSchema.safeParse(form)`, extract errors by `path`, assign to the errors ref, display each error next to its field
   - On success: submit to the server API (`$fetch('/api/contact', { method: 'POST', body: form })`), show success or server-returned error

4. **Server API endpoint** — `server/api/contact.post.ts`:
   - Read the POST body with `readBody(event)`
   - Validate with `contactSchema.safeParse(body)` — same schema, same rules
   - Return `{ success: false, errors: result.error.errors }` on failure, or `{ success: true }` on success
   - Never trust the client-side validation alone — the server validates independently

5. **Register form component** — `app/components/RegisterForm.vue`:
   - Same pattern as the contact form but using `registerSchema`
   - Specifically verify the `.refine()` cross-field check works: submitting mismatched passwords should show an error on `confirmPassword`

6. **Pages** — `app/pages/contact.vue` and `app/pages/register.vue` mounting the respective form components, with navigation links in `app/app.vue`.

7. **Evidence capture** — screenshots of: field-level errors on each field independently, success state, mismatched passwords error, and the server's error response visible in the browser's Network tab.

## Why This Order

Schemas are defined first so both the form components and the server endpoint are built against a fixed contract — same principle as defining types first in every prior ticket. The contact form is built before the register form since it has no cross-field validation, making it a simpler first pass. The server endpoint comes after the client form so it can be tested immediately after the client submit wires up.

## Key Technical Rules for This Ticket

- `safeParse` exclusively — never `parse`
- Types inferred from schemas with `z.infer<>` — never manually written to match a schema
- Schemas in `shared/` — never duplicated between client and server
- Field-level errors using `error.errors[n].path` — never a generic "form is invalid" message only

## Open Question / Risk

Zod 4 changed some error-formatting APIs from Zod 3 — specifically `error.flatten()` and `error.format()` have slightly different shapes. Confirm the installed version with `npm list zod` before implementation and use the Zod 4 docs specifically, not older tutorials written for Zod 3.
