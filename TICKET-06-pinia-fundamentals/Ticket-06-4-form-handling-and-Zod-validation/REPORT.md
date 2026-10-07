# Weekly Work Report

**Ticket:** TICKET-06-4-form-handling-and-Zod-validation — Form Handling & Validation with Zod
**Project:** `nuxt-zod-forms`
**Type:** Training / Skill Development

---

## Work Completed

- Scaffolded a new Nuxt 4 project (`nuxt-zod-forms`), installed Zod 4.6.5 — version confirmed before implementation to avoid following Zod 3 docs
- Defined two schemas in `shared/schemas/index.ts` (shared between client and server):
  - `contactSchema`: `name` (min 2 chars), `email` (valid format), `message` (min 10 chars)
  - `registerSchema`: `username` (min 3 chars), `email`, `password` (min 8 chars), `confirmPassword` — with a `.refine()` cross-field check placing the mismatch error specifically on the `confirmPassword` field
  - TypeScript types inferred from both schemas using `z.infer<>`
- Built `ContactForm.vue` with:
  - `reactive` form state typed as `ContactForm`
  - Field-level error display using `err.path[0]` to assign each error to the correct field slot
  - Client-side `safeParse` validation before any server call
  - Server POST to `server/api/contact.post.ts` on valid submission, with server error handling
- Built `server/api/contact.post.ts` validating the POST body server-side using the same `contactSchema`, returning `{ success: true }` or throwing `createError({ statusCode: 400, data: result.error.issues })`
- Built `RegisterForm.vue` with the same client-side validation pattern, using `registerSchema` and `.reduce()` to populate field errors — server call intentionally commented out (see Open Items below)
- Created `app/pages/contact.vue` and `app/pages/register.vue` mounting the respective form components, with navigation in `app/app.vue`
- Verified all cases manually:
  - Contact form: empty submit, invalid email, valid submit — all correct
  - Register form: mismatched passwords error displayed on `confirmPassword` field specifically — `.refine()` confirmed working
  - Ran `npx nuxt typecheck` — zero TypeScript errors confirmed

## How It Was Done

Followed the approach document's sequence: schemas defined first as a shared contract → contact form client-side validation → server endpoint → register form with cross-field validation → pages and navigation. `safeParse` used exclusively throughout — never `parse`. Field-level errors assigned using `err.path[0]` as the key into the errors reactive object, matching each error to its field in the template.

## Technical Decisions

**Decision:** Used `result.error.issues` instead of `result.error.errors` or `result.error.format()`.
**Why:** `issues` is the correct Zod 4 property name for the flat array of validation failures. `.format()` and `.flatten()` are Zod 3 APIs that changed shape in Zod 4 — using the raw `issues` array avoids version-specific API differences and gives direct access to `path` and `message` per failure.

**Decision:** Used `.reduce()` instead of `.forEach()` in `RegisterForm.vue` to populate field errors.
**Why:** `.reduce()` with the `errors` reactive object as the accumulator is a valid, slightly more functional alternative to `.forEach()` — both achieve the same result. The pattern is consistent: `err.path[0]` as the key, `err.message` as the value.

**Decision:** Register form's server call (`$fetch('/api/register')`) was commented out rather than implemented.
**Why:** `server/api/register.post.ts` was not included as an explicit step in the confirmed approach document. Implementing it without a confirmed scope change would add unreviewed work — flagged as an open item for a follow-up decision instead. See Open Items below.

**Decision:** Schemas placed in `shared/schemas/index.ts` rather than `app/schemas/`.
**Why:** Nuxt's `shared/` directory is accessible to both `app/` (client) and `server/` code — the correct location for any module that must be imported by both sides. `app/schemas/` would not be accessible from server routes.

**Decision:** Used `npx nuxt typecheck` as the TypeScript verification command rather than `vue-tsc --noEmit`.
**Why:** `npx nuxt typecheck` is the canonical Nuxt 4 way to run type checking — it handles all Nuxt-specific type generation and configuration automatically, and integrates cleanly with the project setup.

## Difficulties / Blockers

**Problem:** Initial `server/api/contact.post.ts` used `readBody(Event, ({ ... }))` — treating `readBody` as if it accepted a callback, and missing `defineEventHandler` entirely.
**Resolution:** Corrected to the standard Nuxt server route pattern: `defineEventHandler(async (event) => { const body = await readBody(event) ... })`.

**Problem:** Initial server route used `result.error.format()` — a Zod 3 API that changed in Zod 4.
**Resolution:** Replaced with `result.error.issues` — the correct Zod 4 flat array of validation failures.

**Problem:** `RegisterForm.vue`'s initial `handleSubmit` was missing a `return` after the validation failure branch, causing the code to fall through to the `$fetch` call even when the form was invalid.
**Resolution:** Added `return` immediately after populating errors on `!result.success`.

**Problem:** `npx vue-tsc --noEmit` failed with a TypeScript/vue-tsc version compatibility error (`ERR_PACKAGE_PATH_NOT_EXPORTED`).
**Resolution:** Installed `vue-tsc` and `typescript@~6.0.3` locally, then used `npx nuxt typecheck` (the canonical Nuxt 4 command) instead of `vue-tsc` directly.

**Problem:** Stray test line in `ContactForm.vue` — `const age: number = "hello my name is chris"` — caused a TypeScript error.
**Resolution:** Removed the test line; `npx nuxt typecheck` returned zero errors immediately after.

## Evidence

- **Formatting** `npx prettier --check .` and `npx prettier --write .` to check the files and format them.

```
➜  nuxt-zod-forms git:(main) ✗ npx  prettier --check .
npm notice run npx
npm notice run 'prettier' --check .
Checking formatting...
[warn] app/app.vue
[warn] app/components/ContactForm.vue
[warn] app/components/RegisterForm.vue
[warn] app/pages/contact.vue
[warn] app/pages/index.vue
[warn] app/pages/register.vue
[warn] nuxt.config.ts
[warn] Code style issues found in 7 files. Run Prettier with --write to fix.
➜  nuxt-zod-forms git:(main) ✗ npx  prettier --write .
npm notice run npx
npm notice run 'prettier' --write .
app/app.vue 121ms
app/components/ContactForm.vue 206ms
app/components/RegisterForm.vue 77ms
app/pages/contact.vue 16ms
app/pages/index.vue 4ms
app/pages/register.vue 16ms
nuxt.config.ts 9ms
package-lock.json 209ms (unchanged)
package.json 2ms (unchanged)
README.md 59ms (unchanged)
server/api/contact.post.ts 10ms (unchanged)
shared/schemas/index.ts 20ms (unchanged)
tsconfig.json 4ms (unchanged)
➜  nuxt-zod-forms git:(main) ✗ npx  prettier --check .
npm notice run npx
npm notice run 'prettier' --check .
Checking formatting...
All matched files use Prettier code style!
➜  nuxt-zod-forms git:(main) ✗
```

- **TypeScript check:** `npx nuxt typecheck` executed successfully with zero errors

```
➜  nuxt-zod-forms git:(main) ✗ npx nuxt typecheck

npm notice run npx
npm notice run 'nuxt' typecheck
app/components/ContactForm.vue:17:7 - error TS2322: Type 'string' is not assignable to type 'number'.

17 const age: number = "just a test"
         ~~~


Found 1 error.

│
■  Type check failed in 3329ms.
➜  nuxt-zod-forms git:(main) ✗ npx nuxt typecheck

npm notice run npx
npm notice run 'nuxt' typecheck
│
◆  Type check passed in 3351ms.
➜  nuxt-zod-forms git:(main) ✗
```

- Contact form: empty submit, invalid email, valid submit — all three cases verified
  ![alt text](./images/image.png)
- Register form: mismatched passwords error confirmed on `confirmPassword` field specifically
  ![alt text](./images/image-1.png)
- Other Screenshots:
  ![alt text](./images/image-2.png)
  ![alt text](./images/image-3.png)

## Acceptance Criteria Status

| Acceptance Criteria                                               | Status | Evidence                                                      |
| ----------------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| Two Zod schemas defined with inferred TypeScript types            | ✅     | `shared/schemas/index.ts`                                     |
| Contact form validates client-side with field-level errors        | ✅     | Manually verified all fields                                  |
| Cross-field password match validated via `.refine()`              | ✅     | Error confirmed on `confirmPassword` field                    |
| Server API endpoint validates contact schema server-side          | ✅     | `server/api/contact.post.ts`                                  |
| Invalid server submission returns typed validation error          | ✅     | `createError({ statusCode: 400, data: result.error.issues })` |
| Schemas in one shared location imported by both client and server | ✅     | `shared/schemas/index.ts`                                     |
| No TypeScript errors                                              | ✅     | `npx nuxt typecheck` returned zero errors                     |

## Definition of Done

| Requirement                                        | Status                                                         |
| -------------------------------------------------- | -------------------------------------------------------------- |
| Both forms implemented and manually tested         | ✅                                                             |
| Server endpoint tested with valid and invalid data | ✅ (contact only — register endpoint deferred, see Open Items) |
| Code compiles with zero TypeScript errors          | ✅                                                             |
| Evidence captured                                  | ✅ Added screenshots                                           |
| Technical decisions and difficulties documented    | ✅                                                             |
| Code committed                                     | ✅ Added commit                                                |

## Next Step

**Next action:** Capture screenshots, commit, resolve the register endpoint open item with reviewer, then submit for sign-off.
**Expected outcome:** Reviewer validates Zod schema usage, field-level error display, server-side validation, and the shared schema pattern; open item on register endpoint resolved before ticket is fully closed.
