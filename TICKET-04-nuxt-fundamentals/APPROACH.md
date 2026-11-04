# Implementation Approach — Nuxt 4 Fundamentals

**Ticket:** TICKET-04-nuxt-fundamentals
**Confirmed stack:** Nuxt 4 (switched from originally planned Nuxt 3, which is end-of-life as of July 31, 2026)

## Planned Approach

1. **Version verification first** — confirm the scaffolded project is genuinely running Nuxt 4 (via `package.json`), not Nuxt 3, before building anything on top of it.

2. **Routing, built incrementally** — start with static pages (`pages/index.vue`, `pages/about.vue`), then a nested index page (`pages/posts/index.vue`), then a dynamic route (`pages/posts/[id].vue`), verifying each one renders correctly before adding the next. Client-side navigation wired up via `<NuxtLink>`, with `<NuxtPage />` confirmed as the actual render target in `app.vue`.

3. **Layouts** — implement a default layout (`layouts/default.vue`) with shared navigation, and a second minimal layout (`layouts/minimal.vue`) with none, applying the alternate layout to a specific page via `definePageMeta` to demonstrate per-page layout overrides.

4. **Server API routes as a mock backend** — use the existing post routes `server/api/post/index.ts` and `server/api/post/[id].ts` (the public paths are `/api/post` and `/api/post/:id`) with their shared dataset in `server/utils/posts.ts`. The supplementary product routes use `/api/products` and `/api/products/:id`, with their shared dataset in `server/utils/products.ts`. Detail routes validate IDs and return 400 for invalid IDs and 404 for missing records.

5. **Data fetching with `useFetch`** — fetch lists and detail records with `lazy: true` so pending states can render during navigation. Handle errors explicitly; on server rendering, propagate a failed detail fetch with `createError` so missing post and product pages return HTTP 404 rather than a successful page containing an error message.

6. **Verify before moving on, at every stage** — each concept (routing, then layouts, then fetching) tested manually in the browser, including explicit negative-path testing (e.g. `/posts/999`), before being considered complete.

## Why This Order

Routing has to exist before layouts can wrap it, and layouts have to be stable before data fetching is layered in — each stage depends on the one before it working correctly, so building and confirming in this order avoids debugging multiple new concepts at once.

## Risks Carried Over From the Ticket

- **Version risk:** building on an end-of-life Nuxt version without noticing — mitigated by explicit version verification before implementation began.
- **Data duplication risk:** keep each resource's mock dataset in one server utility shared by its list and detail routes.

## Open Question / Risk

SSR vs. SSG rendering-mode selection is not covered in this approach — deferred to a follow-up session, consistent with the ticket's stated scope.
