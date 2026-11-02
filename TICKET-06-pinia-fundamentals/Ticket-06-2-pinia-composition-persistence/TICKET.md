# Ticket: Pinia — Store Composition, Persistence & DevTools

**Type:** Training / Skill Development
**Category:** Frontend — Nuxt 4 / Pinia
**Project:** `nuxt-with-pinia-2` (new, dedicated Nuxt 4 project)
**Status:** On going

## Description

Build competency in Pinia patterns required for real applications, beyond the single-store mechanics covered in Ticket-06-1: one store referencing another (composition), persisting store state across page reloads, and using Vue/Pinia DevTools to inspect state changes during development. Implemented in a fresh, dedicated project (`nuxt-with-pinia-2`), separate from `nuxt-with-pinia` (Ticket-06-1).

## Context / Background

Ticket-06-1 deliberately scoped out store composition and persistence to isolate core mechanics first, using `nuxt-with-pinia`. This ticket continues that learning track in a new project, since the Nuxt-specific persistence module (`pinia-plugin-persistedstate/nuxt`) was unavailable in the environment, requiring a manual plugin-registration approach instead — a genuinely useful pattern in its own right (registering a third-party Pinia plugin manually via a Nuxt plugin file), not just a workaround.

## Detailed Description

### Core Features

**Project Setup**

- Scaffold a new Nuxt 4 project (`nuxt-with-pinia-2`)
- Install `pinia`, `@pinia/nuxt`, and `pinia-plugin-persistedstate` (base package, not the Nuxt-specific submodule)
- Manually register the persistence plugin via a client-only Nuxt plugin file (`app/plugins/persistedstate.client.ts`), since the dedicated Nuxt module is unavailable

**Store Composition**

- Create a `userStore` (`state: { isLoggedIn, name }`, actions `login(name)` / `logout()`)
- Create a `cartStore` whose `addItem` action checks `useUserStore().isLoggedIn` before proceeding, demonstrating one store calling into another
- Verify: adding an item while logged out is blocked; logging in first allows it

**Persistence**

- Apply `persist: true` to one store with a genuine reason to persist (e.g. a `theme` store, or `userStore`'s login state)
- Confirm state survives a full page reload (not just client-side navigation)

**DevTools**

- Use Vue DevTools' Pinia panel to inspect store state in real time
- Observe a state change firing as an action is triggered, directly in DevTools

### Technical Requirements

- TypeScript used throughout, including correctly typed cross-store references
- Plugin registered as `.client.ts` (browser-only), since persistence depends on `localStorage`, which doesn't exist during Nuxt's server-side rendering
- Persistence applied narrowly (one store, deliberately chosen), not by default to every store

### Out of Scope

- The Nuxt-specific `pinia-plugin-persistedstate/nuxt` module (unavailable in this environment; manual registration used instead)
- Persisting to anything other than `localStorage`
- Complex multi-directional store composition (circular references)
- Production-grade persistence concerns (encryption, schema migration)

## Acceptance Criteria

- [ ] `nuxt-with-pinia-2` scaffolded and running
- [ ] Persistence plugin manually registered via a client-only Nuxt plugin, confirmed working
- [ ] `userStore` and `cartStore` created, with `cartStore` correctly calling into `userStore`
- [ ] Adding a cart item while logged out is blocked; works correctly once logged in
- [ ] At least one store persists correctly across a full page reload
- [ ] Vue DevTools' Pinia panel used to observe live state during at least one action trigger
- [ ] No TypeScript errors (`vue-tsc --noEmit` clean)

## Risks & Open Points

- **Risk:** Manual plugin registration applied incorrectly (e.g. missing `.client.ts` suffix), causing a server-side crash since `localStorage` is undefined during SSR.
  → **Mitigation:** Plugin file explicitly named and scoped as client-only.
- **Risk:** Over-persisting — applying `persist: true` to every store without reason.
  → **Mitigation:** Apply to exactly one store with a stated reason.
- **Open Point:** Confirm with reviewer whether the manual registration approach is acceptable long-term, or whether the Nuxt-specific module should be retried later (e.g. after a dependency/version fix).

## Definition of Done

- [ ] Implementation completed and manually tested in the browser, including an actual full-page-reload test
- [ ] Code compiles with zero TypeScript errors
- [ ] Evidence captured (DevTools screenshot showing live state, before/after-reload screenshot proving persistence, and the blocked-vs-allowed cart action)
- [ ] Technical decisions and difficulties documented
- [ ] Code committed with clear, descriptive commit messages
