# Weekly Work Report

**Ticket:** Ticket-06-3-api-integration-patterns — API Integration Patterns
**Project:** `nuxt-api-patterns`
**Type:** Training / Skill Development

---

## Work Completed

- **Project Setup:** Created a dedicated Nuxt 4 project (`nuxt-api-patterns`) for learning API integration and typed data access patterns.
- **Typed API Contract:** Added `app/types/api.ts` with the shared data contracts for `User`, `Post`, `Status`, and `ApiResponse`.
- **Mock API Backend:** Built mock server data and endpoints under `server/data/` and `server/api/`:
  - `server/api/users/index.ts`
  - `server/api/users/[id].ts`
  - `server/api/posts/index.ts`
  - `server/api/posts/[id].ts`
- **Typed Fetch Wrapper:** Implemented `app/composables/useApi.ts` as a reusable `$fetch` wrapper with generics and consistent error handling.
- **Pinia Store Integration:** Added `app/stores/usersStore.ts` and `app/stores/postsStore.ts` so the app fetches data through a central store layer rather than calling the API directly in components.
- **Loading / Success / Error States:** Each store tracks a `status` value (`loading`, `success`, `error`) and only exposes resolved data when the request succeeds.
- **Component Consumption:** Created list pages and detail pages to consume the stores and typed API results:
  - `app/pages/users/index.vue`
  - `app/pages/posts/index.vue`
  - `app/pages/users/[id].vue`
  - `app/pages/posts/[id].vue`
- **Graceful 404 Handling:** The server routes intentionally throw `createError({ statusCode: 404 ... })` for missing ids, and the client-side UI surfaces that as a controlled error message instead of an unhandled exception.
- **Navigation Layer:** Added a simple app-level navigation in `app/app.vue` so users can move between the users and posts sections.
- **Verification:** Confirmed the project builds successfully via `npm run build`, with Nuxt generating the production output without errors.
- **Type Check Follow-up:** Resolved one strict TypeScript issue exposed by `npx nuxi typecheck`: `server/data/posts.ts` was importing `Post` as a runtime value instead of a type-only import, which violates `verbatimModuleSyntax`.

## How It Was Done

The implementation followed the same layered approach used elsewhere in the training work:

1. Define the data contract first so the API, stores, and UI all agree on the same types.
2. Create mock server routes that mimic a real backend and return typed JSON payloads.
3. Build a reusable `useApi` wrapper around `$fetch` so all requests use one consistent pattern.
4. Move async data loading into Pinia stores, keeping the component layer focused on rendering and user interaction.
5. Surface loading and error states explicitly in the UI so the app communicates fetch progress and failure clearly.
6. Validate the build after implementation to confirm the solution compiles cleanly.

## Technical Decisions

- **Decision:** Use `useApi` with `$fetch` instead of `useFetch` in the shared wrapper.
  - **Why:** `useFetch` is a component/composable API and is not appropriate inside a Pinia store action. `$fetch` is the correct underlying tool for async data access from stores and utility functions.

- **Decision:** Use relative endpoints such as `/api/users` and `/api/posts` rather than introducing `runtimeConfig` for a simple mock-server exercise.
  - **Why:** The data is served from the same Nuxt project, so a relative path keeps the implementation simple and directly demonstrates the API-layer pattern without introducing extra configuration complexity.

- **Decision:** Keep a single shared `Status` type and typed response payload structure instead of scattering ad hoc types through each page.
  - **Why:** Consistency makes the store behavior easier to reason about and preserves TypeScript safety across API calls and UI rendering.

- **Decision:** Return structured `{ data, error }` results from the API wrapper instead of throwing directly from every UI call.
  - **Why:** A centralized wrapper allows components and stores to handle success and failure in one consistent place and makes the error state visible to the UI.

## Difficulties / Blockers

- **Problem:** The key conceptual risk in this ticket was mixing `useFetch` with store-driven logic.
- **Impact:** `useFetch` belongs in a component/composable context, not inside a store action, so the correct abstraction had to be built around `$fetch`.
- **Resolution:** Refactored the data access pattern into a reusable wrapper (`useApi`) so Pinia stores could call it safely while still keeping type information intact.

- **Problem:** Missing ids must resolve to a controlled error rather than a broken page or an unhandled exception.
- **Impact:** A 404 response needs to be shown as a user-friendly state, not as a raw failure.
- **Resolution:** The server routes throw `createError({ statusCode: 404, ... })`, and the fetch wrapper captures the message so the UI can display `User not found.` or `Post not found.`

- **Problem:** `npx nuxi typecheck` surfaced a TypeScript strictness error: `TS1484` in `server/data/posts.ts` because `Post` was imported using a normal import instead of a type-only import.
- **Impact:** Under `verbatimModuleSyntax`, type-only imports must stay type-only or the project fails strict type checking.
- **Resolution:** Updated the import to `import type { Post } from "~/types/api";`. The project then passed `npx nuxi typecheck` successfully.

- **Status:** No major tooling blockers were encountered. The final implementation built successfully, strict type checking passed, and the app logic matched the intended API-integration pattern.

## Evidence

Local project: `nuxt-api-patterns`

- **Verified build status:** `npm run build` completed successfully with Nuxt's production build output generated without errors.
- **Verified type-check status:** `npx nuxi typecheck` initially reported `TS1484` in `server/data/posts.ts` because `Post` was imported as a normal runtime import. After switching to `import type { Post } from "~/types/api";`, the strict type check passed cleanly.
- **Manual validation:** Confirmed the application loads the users list and posts list, navigates to detail pages, and handles missing-resource requests cleanly with an error message.
- **Data flow validation:** Confirmed the stores encapsulate the fetch logic, and the pages only consume store state and actions rather than calling fetch logic directly in the component.
- **Screenshots to be added later:**
  - Users list page loading successful data
  - Posts list page loading successful data
  - User detail page with typed data rendered
  - Post detail page with typed data rendered
  - Error state for a missing user/post id
  - An editor view showing the typed API contracts and returned data shape

## Acceptance Criteria Status

| Acceptance Criteria                                       | Status | Evidence                                                      |
| :-------------------------------------------------------- | :----: | :------------------------------------------------------------ |
| Reusable typed API wrapper using `$fetch` exists          |   ✅   | `app/composables/useApi.ts`                                   |
| At least two response types are defined and reused        |   ✅   | `User`, `Post`, `Status`, `ApiResponse` in `app/types/api.ts` |
| At least two mock server routes return data               |   ✅   | `/api/users` and `/api/posts` plus detail routes              |
| Pinia stores contain async fetch actions                  |   ✅   | `app/stores/usersStore.ts` and `app/stores/postsStore.ts`     |
| Store manages `loading` / `success` / `error` states      |   ✅   | `status` values in each store                                 |
| Components consume store state and actions only           |   ✅   | `users/index.vue` and `posts/index.vue` call store actions    |
| Deliberate error path is triggered and handled gracefully |   ✅   | `404` handling on `/api/users/999` and `/api/posts/999`       |
| Build completes without TypeScript/build errors           |   ✅   | Verified with `npm run build` and `npx nuxi typecheck`        |

## Definition of Done

| Requirement                                                   | Status |
| :------------------------------------------------------------ | :----: |
| API integration pattern implemented and tested in the browser |   ✅   |
| Shared typed API contract defined and reused                  |   ✅   |
| Nuxt mock backend created for list and detail endpoints       |   ✅   |
| Pinia stores encapsulate async data fetching                  |   ✅   |
| Loading and error states handled in UI                        |   ✅   |
| Final project build validated successfully                    |   ✅   |
| Screenshots reserved for later attachment                     |   ✅   |

## Next Step

**Next action:** Add the captured screenshots for the successful load states and error path, then submit the final ticket evidence pack for review.
**Expected outcome:** Reviewer confirms the API integration pattern is implemented correctly and that the training objective for typed API clients and Pinia-driven data flow is met.
