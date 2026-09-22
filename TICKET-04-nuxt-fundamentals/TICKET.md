# Ticket: Nuxt 4 Fundamentals — Routing, Layouts & Data Fetching

**Type:** Training / Skill Development
**Category:** Frontend — Nuxt 4
**Status:** Implemented (retroactive ticket)

## Description

Build foundational competency in Nuxt 4 (file-based routing, layouts, and data fetching) through a small multi-page application backed by real Nuxt server API routes, in preparation for client work on Nuxt/Vue-based projects.

## Context / Background

This ticket exists to document a session originally planned around "Nuxt 3" per the initial learning roadmap. During setup, it was identified that Nuxt 3 reached end-of-life (July 31, 2026) and is no longer receiving security patches. The session was redirected to **Nuxt 4** (the current actively maintained version) instead, since client work would use the current supported version, not a deprecated one.

This ticket is written retroactively, documenting work completed before formalizing it as a ticket — consistent with the practice established on prior sessions of the same kind.

## Detailed Description

### Core Features

**Static & Nested Routing**

**Note:** _*everything about products is a similar implementation like the post was just practicing more so you wont find any documentation for the products*_

- Home page (`/index`)
- About page (`/about`)
- Posts index page (`/posts/index`)

**Dynamic Routing**

- Individual post page via dynamic segment (`/posts/[id]`)

**Layouts**

- Default layout with shared navigation (`layouts/default.vue`)
- Alternate minimal layout with no navigation (`layouts/minimal.vue`), applied via `definePageMeta`

**Data Fetching**

- Mock backend implemented using Nuxt server API routes (`server/api/posts.ts`, `server/api/posts/[id].ts`)
- Post list fetched via `useFetch('/api/posts')`
- Individual post fetched via `useFetch('/api/posts/:id')`, using `getRouterParam` server-side to resolve the dynamic id

### Technical Requirements

- Nuxt 4 project structure (`app/pages/`, `app/layouts/`, `server/api/`)
- `<NuxtLink>` for client-side navigation, `<NuxtPage />` for route rendering, `<NuxtLayout>` for layout wrapping
- `useFetch` for all data loading, with explicit `status`/`error` handling in every fetching page (no silent failure states)
- TypeScript (`lang="ts"`) on every `<script setup>` block, including files using Nuxt auto-imported macros (`definePageMeta`)

### Out of Scope

- SSR/SSG deep-dive (deferred to a follow-up session)
- Pinia / global state management
- Real database or persistent backend (mock server routes only)
- Styling beyond basic readability

## Acceptance Criteria

- [x] Static routes (`/`, `/about`) render correctly
- [x] Nested route (`/posts`) renders correctly
- [x] Dynamic route (`/posts/[id]`) correctly reads and displays the route parameter
- [x] `<NuxtLink>` navigation works without full page reloads
- [x] Default layout displays shared navigation across applicable pages
- [x] An alternate layout can be applied to a specific page via `definePageMeta`
- [x] Post list page fetches and displays real data from a Nuxt server API route
- [x] Individual post page fetches and displays real data based on the dynamic route id
- [x] Loading state is shown while data is in flight
- [x] Error/not-found state is shown when a post id does not exist (verified via `/posts/999`)

## Risks & Open Points

- **Risk:** Building on the end-of-life Nuxt 3 without noticing, leading to wasted work on an unsupported version.
  → **Mitigation:** Version explicitly checked (`npm list nuxt` / `package.json`) and confirmed as Nuxt 4 before proceeding.
- **Risk:** Silent duplication of mock data across two server route files (`posts.ts` and `posts/[id].ts`).
  → **Mitigation:** Acceptable shortcut for a training exercise; flagged explicitly as not a pattern to repeat in production, where this would come from a shared data source or real database.
- **Open Point:** SSR vs SSG behavior and when to choose each — not yet covered, planned as a follow-up session.

## Definition of Done

- [x] Implementation completed and manually tested in the browser
- [x] Both success and error/not-found paths explicitly tested (not just the happy path)
- [x] Code compiles/runs with no console errors
- [ ] Code committed with descriptive commit messages
- [ ] Evidence captured (screenshots of routing, layouts, and both fetch states)
- [x] Technical difficulties documented (see REPORT.md)
- [ ] Code review completed
- [ ] QA validated
