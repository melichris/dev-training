# Ticket: API Integration Patterns — Typed API Clients & ofetch Wrappers

**Type:** Training / Skill Development
**Category:** Frontend — Nuxt 4 / TypeScript / API Layer
**Project:** New dedicated Nuxt 4 project (`nuxt-api-patterns`)
**Status:** Ongoing

## Description

Build competency in typed API integration patterns for Nuxt 4 applications: creating a reusable, type-safe API client using Nuxt's built-in `$fetch` (ofetch), wrapping it with TypeScript generics for reuse across different endpoints, and consuming it correctly from both components and Pinia stores. This establishes the data-layer foundation required for Day 5's full Nuxt + Pinia + API build.

## Context / Background

Prior tickets (Recipe Book, Expense Tracker, Nuxt fundamentals) used either hardcoded mock data or simple `useFetch` calls directly in page components. Real applications require a structured API layer that:

- Centralizes base URL, headers, and error handling in one place
- Uses TypeScript generics to return correctly typed data per endpoint
- Can be reused from both components and Pinia stores without duplication

Without this foundation, every component would duplicate fetch logic, error handling would be inconsistent, and TypeScript wouldn't catch mismatches between API responses and the types the app expects.

## Detailed Description

### Core Features

**1. A typed API client using `$fetch`**

- Create a reusable `useApi` composable (or a plain `api.ts` utility) that wraps Nuxt's built-in `$fetch`
- Accept a generic type parameter `<T>` so the caller decides what shape the response should be
- Handle base URL configuration (via `runtimeConfig` or a simple constant for this exercise)
- Handle errors consistently, returning a typed result rather than throwing unhandled exceptions everywhere

**2. TypeScript generics in the API layer**

- Define response types for at least two different endpoints (e.g. `Post` and `User`)
- Call the same wrapper function with different generic types and confirm TypeScript correctly types the returned data in each case

**3. Nuxt server routes as a mock backend**

- Build at least two mock API endpoints under `server/api/` returning typed JSON
- One list endpoint (e.g. `/api/users`) and one detail endpoint (e.g. `/api/users/[id]`)

**4. Consuming the API layer from a Pinia store**

- Create a store with an async action that calls the typed API client
- The async action should set a `status` ref (`loading`/`success`/`error`) and populate a typed `data` ref
- Demonstrate that the component only calls a store action — it does not call `$fetch` or `useFetch` directly

**5. Error handling**

- Deliberately trigger an error (e.g. request a nonexistent resource) and confirm it is caught and surfaced correctly — both in the store's `status` and in the component's UI

### Technical Requirements

- TypeScript generics used in the API wrapper (`<T>` on the fetch function)
- Response types defined as interfaces in a `types/` file, exported and reused
- No raw `$fetch` calls scattered in components — all network calls go through the typed wrapper
- Pinia store handles all async state (`status`, `data`, `error`) — components only call actions and read state

### Out of Scope

- Real external API calls (mock server routes only — no third-party API keys required)
- Axios (Nuxt 4 ships with `$fetch`/ofetch built-in; Axios is only relevant if a client project uses it, and is deferred to that context)
- Authentication headers / token management (deferred to a later ticket)
- Pagination (single-page lists only for this exercise)

## Acceptance Criteria

- [ ] A reusable typed API wrapper (`useApi` or `api.ts`) exists, using `$fetch` with a generic type parameter
- [ ] At least two response types are defined and used correctly
- [ ] At least two Nuxt server routes provide mock data
- [ ] A Pinia store contains an async action that calls the typed API wrapper
- [ ] The store correctly manages `status` (`loading`/`success`/`error`) and typed `data`
- [ ] Components consume store state and call store actions only — no direct `$fetch` in components
- [ ] A deliberate error case is triggered and handled gracefully (no unhandled exceptions, UI shows error state)
- [ ] No TypeScript errors (`vue-tsc --noEmit` clean)

## Risks & Open Points

- **Risk:** Reaching for `useFetch` inside a Pinia store action — `useFetch` is a Vue composable and cannot be called inside a store action (only inside `<script setup>` or another composable). `$fetch` (the underlying utility) must be used instead inside store actions.
  → **Mitigation:** Explicitly using `$fetch` (not `useFetch`) in the API wrapper, which is safe to call from anywhere including store actions.
- **Risk:** Losing TypeScript's type safety at the `$fetch` call if generics are not wired through correctly.
  → **Mitigation:** Verify TypeScript types by hovering over the returned data in the editor and confirming it matches the expected interface, not just trusting that it compiles.
- **Open Point:** Whether `runtimeConfig` or a simple constant is used for the base URL — to be decided during implementation and documented as a technical decision.

## Definition of Done

- [ ] Implementation completed and manually tested in the browser
- [ ] Both happy path (data loads) and error path (error surfaced correctly) tested explicitly
- [ ] Code compiles with zero TypeScript errors
- [ ] Evidence captured (screenshots of loaded data, error state, and TypeScript types visible in editor)
- [ ] Technical decisions and difficulties documented
- [ ] Code committed with clear, descriptive commit messages
