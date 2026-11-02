# Implementation Approach — Pinia Composition, Persistence & DevTools

**Ticket:** Ticket-06-2-pinia-composition-persistence
**Project:** `nuxt-with-pinia-2` (new project, separate from `nuxt-with-pinia`)

## Planned Approach

1. **Scaffold the project** — `npx nuxi@latest init nuxt-with-pinia-2`, install dependencies, confirm the dev server runs before any feature work. Initial commit immediately after scaffolding, before writing any store code.

2. **Install and manually register persistence** — install `pinia`, `@pinia/nuxt`, and `pinia-plugin-persistedstate` (base package). Since the dedicated `pinia-plugin-persistedstate/nuxt` module is unavailable in this environment, register the plugin manually via `app/plugins/persistedstate.client.ts`, using `defineNuxtPlugin` to access the app's Pinia instance and call `.use(piniaPluginPersistedstate)` on it. The `.client.ts` suffix is essential — this plugin must not attempt to run during server-side rendering, since `localStorage` does not exist there.

3. **Store composition — `userStore` + `cartStore`** — build `userStore` first (minimal: `isLoggedIn`, `name`, `login`/`logout` actions), verified independently. Then build `cartStore`, whose `addItem` action imports and calls `useUserStore()` internally, checking `isLoggedIn` before allowing the item to be added. Verify both the blocked case (logged out) and the allowed case (logged in) explicitly.

4. **Apply persistence to one store, deliberately** — add `persist: true` to whichever store makes the most sense to survive a reload (a `theme` store, or `userStore`'s login state, decided during implementation based on which is more illustrative). Reload the full page (not client-side navigation) and confirm state is restored correctly.

5. **DevTools verification** — install the Vue DevTools browser extension if not already present, open its Pinia panel, and observe `userStore` and `cartStore` state live as actions are triggered from the UI — confirming the composition (Step 3) and persistence (Step 4) behavior directly in DevTools, not just by trusting the rendered page.

6. **Evidence capture** — DevTools screenshot showing live state, a before/after full-page-reload screenshot pair proving persistence, and a screenshot each of the blocked and allowed cart-add attempts.

## Why This Order

Composition is built and verified first since it requires no new tooling beyond what Ticket-06-1 already established. Persistence is introduced only after composition is solid, since it adds a new dependency (the manually-registered plugin) that's easier to debug in isolation rather than alongside new store-composition logic. DevTools is used throughout Steps 3-4 as a verification tool, not treated as a separate isolated step, since its value is in confirming the other two, not as a standalone skill.

## Risks Carried Over From the Ticket

- **Manual plugin registration correctness:** verified explicitly via the `.client.ts` suffix and a successful page reload without SSR errors, rather than assumed correct from the code alone.
- **Over-persisting:** `persist: true` applied to exactly one store, with the choice justified in the final report.

## Open Question / Risk

Whether the Nuxt-specific persistence module should be retried in a future ticket (e.g. after a version/dependency investigation) — flagged for reviewer input rather than resolved unilaterally, since the manual approach used here is a valid, if slightly more manual, alternative.
