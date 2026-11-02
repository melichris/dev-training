# Implementation Approach — Vitest Fundamentals

**Ticket:** TICKET-11-vitest-fundamentals
**Project:** `nuxt-vitest-fundamentals` (new Nuxt 4 project)

## Planned Approach

1. **Scaffold & install** — `npx nuxi@latest init nuxt-vitest-fundamentals`, then:

   ```bash
   npm install -D vitest @nuxt/test-utils happy-dom
   ```

   Add to `nuxt.config.ts`:

   ```typescript
   export default defineNuxtConfig({
     modules: ["@nuxt/test-utils/module"],
   });
   ```

   Add to `package.json`:

   ```json
   "scripts": { "test": "vitest" }
   ```

   Create `vitest.config.ts`:

   ```typescript
   import { defineVitestConfig } from "@nuxt/test-utils/config";
   export default defineVitestConfig({
     test: { environment: "happy-dom" },
   });
   ```

2. **First passing test** — confirm setup works with a trivial test before writing real ones:

   ```typescript
   it("sanity check", () => {
     expect(1 + 1).toBe(2);
   });
   ```

3. **Utility function tests** — create `app/utils/helpers.ts` with 2-3 pure functions (e.g. `formatUsername`, `isValidId`, `clampNumber`), then test each with happy path, edge cases, and failure cases in `tests/helpers.test.ts`

4. **Zod schema tests** — define schemas in `shared/schemas/index.ts` (same as capstone), test in `tests/schemas.test.ts`:
   - Valid data passes `safeParse`
   - Each invalid field fails with the correct message
   - Cross-field `.refine()` catches mismatched passwords

5. **Composable tests** — create `app/composables/useCounter.ts`, test in `tests/useCounter.test.ts` using a plain Vue app wrapper (`withSetup` pattern) to provide Vue component context for the composable

## Key Rule

Plain Vitest environment (`happy-dom`) for all Day 1 tests — no `nuxt` environment needed since nothing uses `useFetch`, `useRoute`, or Nuxt auto-imports.
