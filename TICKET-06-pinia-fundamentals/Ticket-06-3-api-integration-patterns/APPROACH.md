# Implementation Approach — API Integration Patterns

**Ticket:** Ticket-06-3-api-integration-patterns
**Project:** `nuxt-api-patterns` (new, dedicated Nuxt 4 project)

## Planned Approach

1. **Scaffold the project** — `npx nuxi@latest init nuxt-api-patterns`, install `pinia` and `@pinia/nuxt`, confirm dev server runs cleanly. Initial commit before any feature work.

2. **Define response types** — create `app/types/api.ts` with at least two typed interfaces:
   - `Post { id, title, body }`
   - `User { id, name, email }`
     Both exported and reused throughout the API layer and stores — single source of truth for data shapes.

3. **Build mock server routes** — create four Nuxt server routes:
   - `server/api/users/index.ts` — returns a `User[]` array
   - `server/api/users/[id].ts` — returns a single `User` or throws `createError({ statusCode: 404 })`
   - `server/api/posts/index.ts` — returns a `Post[]` array
   - `server/api/posts/[id].ts` — returns a single `Post` or throws `createError({ statusCode: 404 })`
     Centralize the mock data for each in one place (not duplicated across the list and detail routes, same lesson as the `nuxt-fundamentals` project).

4. **Build the typed API wrapper** — create `app/composables/useApi.ts`:
   - A function that accepts a URL (string) and a generic type `<T>`
   - Wraps `$fetch<T>(url, options?)` with consistent error handling (try/catch, returning `{ data, error }` rather than throwing)
   - Safe to call from both `<script setup>` and Pinia store actions (unlike `useFetch`, which is composable-only)

5. **Build Pinia stores consuming the API layer** — create `app/stores/usersStore.ts` and `app/stores/postsStore.ts`:
   - Each with `status: Status`, `data: T[] | null`, and an async `fetch` action that calls `useApi`
   - `status` set to `'loading'` before the call, `'success'` on resolution, `'error'` on failure
   - Components never call `$fetch` directly — they call store actions only

6. **Build pages consuming the stores** — `app/pages/users/index.vue` and `app/pages/posts/index.vue`:
   - Call the store's fetch action in `onMounted`
   - Display loading/error/success states
   - Link to detail pages

7. **Deliberately trigger the error path** — visit `/api/users/999` and `/api/posts/999` (nonexistent ids), confirm the error is caught by the API wrapper, surfaced in the store's `status`, and displayed correctly in the UI — not an unhandled exception.

8. **Evidence capture** — screenshots of loaded list data, a detail page, an error state, and the TypeScript type visible in the editor on a returned data value.

## Why This Order

Types are defined first so server routes and the API wrapper are built against a fixed contract from the start — not retrofitted afterward. Server routes come before the API wrapper so the wrapper can be immediately tested against real (mock) endpoints. Stores are built after the wrapper so the async action pattern is clear before components consume it. Pages come last so there's always a working layer beneath each new piece.

## Key Technical Constraint

`useFetch` cannot be called inside a Pinia store action — it is a Vue composable that requires an active component setup context. `$fetch` (the underlying ofetch utility) has no such restriction and is the correct tool for store actions. The typed wrapper is built around `$fetch` specifically for this reason.

## Open Question / Risk

Whether to use Nuxt `runtimeConfig` for the base URL or a simple hardcoded constant — for a training exercise with mock server routes on the same origin, a simple constant (or no base URL at all, using relative paths like `/api/users`) is simpler and avoids the `runtimeConfig` concept being introduced prematurely. Decision and reasoning to be documented in the report.
