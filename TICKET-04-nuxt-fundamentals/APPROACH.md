# Implementation Approach — Nuxt 4 Fundamentals

**Ticket:** TICKET-04-nuxt-fundamentals
**Confirmed stack:** Nuxt 4 (switched from originally planned Nuxt 3, which is end-of-life as of July 31, 2026)

## Planned Approach

1. **Version verification first** — confirm the scaffolded project is genuinely running Nuxt 4 (via `package.json`), not Nuxt 3, before building anything on top of it.

2. **Routing, built incrementally** — start with static pages (`pages/index.vue`, `pages/about.vue`), then a nested index page (`pages/posts/index.vue`), then a dynamic route (`pages/posts/[id].vue`), verifying each one renders correctly before adding the next. Client-side navigation wired up via `<NuxtLink>`, with `<NuxtPage />` confirmed as the actual render target in `app.vue`.

3. **Layouts** — implement a default layout (`layouts/default.vue`) with shared navigation, and a second minimal layout (`layouts/minimal.vue`) with none, applying the alternate layout to a specific page via `definePageMeta` to demonstrate per-page layout overrides.

4. **Server API routes as a mock backend** — build `server/api/posts/index.ts` (list endpoint) and `server/api/posts/[id].ts` (single-item endpoint, using `getRouterParam` to resolve the dynamic id), with a single centralized mock dataset shared between both routes rather than duplicated, reflecting how a real backend would source data from one place.

5. **Data fetching with `useFetch`** — fetch the list on `pages/posts/index.vue` and the individual item on `pages/posts/[id].vue`, with explicit `status`/`error` handling in both, including a genuine not-found path (`createError` server-side, consumed via the `error` ref client-side) rather than assuming the happy path is sufficient.

6. **Verify before moving on, at every stage** — each concept (routing, then layouts, then fetching) tested manually in the browser, including explicit negative-path testing (e.g. `/posts/999`), before being considered complete.

## Why This Order

Routing has to exist before layouts can wrap it, and layouts have to be stable before data fetching is layered in — each stage depends on the one before it working correctly, so building and confirming in this order avoids debugging multiple new concepts at once.

## Risks Carried Over From the Ticket

- **Version risk:** building on an end-of-life Nuxt version without noticing — mitigated by explicit version verification before implementation began.
- **Data duplication risk:** avoided by centralizing mock data in one location, shared by both server routes, rather than repeating it.

## Open Question / Risk

SSR vs. SSG rendering-mode selection is not covered in this approach — deferred to a follow-up session, consistent with the ticket's stated scope.
