# Nuxt 4 Fundamentals

A small multi-page Nuxt 4 application demonstrating file-based routing, layouts, and data fetching against a real (mock) backend built with Nuxt server API routes.

**Ticket:** TICKET-04-nuxt-fundamentals
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript

## Package Manager

This project uses **npm** as its package manager. The pnpm lockfile/config was removed to avoid lockfile drift and ensure dependency installs are consistent across the workspace.

## Note on Version

This project was originally scoped around Nuxt 3, per the initial learning roadmap. Nuxt 3 reached end-of-life on July 31, 2026 and no longer receives security patches, so this project uses **Nuxt 4** (the current actively maintained version) instead.

## Features

- File-based routing with static pages such as `/` and `/about`
- Nested route for `/posts`
- Dynamic route for `/posts/[id]`
- Client-side navigation via `<NuxtLink>` without full page reloads
- Default shared layout with global navigation
- Alternative per-page layout via `definePageMeta` (`minimal` layout)
- Data fetching using `useFetch` and `useAsyncData` patterns
- Loading, error, and not-found handling for route-driven content
- Route parameter validation and page-specific rendering decisions
- SSR / SSG / CSR concepts with route-level rendering control

## Tech & Patterns Demonstrated

- **Routing:** file-based routing under `app/pages/`, including nested routes and dynamic segments
- **Navigation:** `<NuxtLink>` for internal navigation and route transitions
- **Layouts:** `<NuxtLayout>` / `<NuxtPage />`, with per-page layout overrides via `definePageMeta`
- **Data fetching:** page-level fetching with `useFetch`, plus handling for `status`, `pending`, and `error`
- **Server routes:** mock backend under `server/api/`, including dynamic parameter resolution (`getRouterParam`) and proper HTTP errors via `createError`
- **Route validation:** `definePageMeta({ validate })` for guarding invalid parameters
- **Route middleware:** protecting or redirecting based on page access rules
- **Rendering modes:** SSR, SSG, and CSR differences, with route-level selection using `definePageMeta`

## Project Structure

```
nuxt-fundamentals/
├── app/
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   └── posts/
│   │       ├── index.vue
│   │       └── [id].vue
│   ├── layouts/
│   │   ├── default.vue
│   │   └── minimal.vue
│   └── app.vue
├── server/
│   └── api/
│       ├── posts.ts
│       └── posts/
│           └── [id].ts
├── docs/
│   ├── nuxt-routing.md
│   ├── nuxt-layouts.md
│   ├── nuxt-dataFetching.md
│   └── nuxt-rendering-modes.md
├── TICKET.md
├── REPORT.md
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and navigate via the links, or try the API routes directly:

- `http://localhost:3000/api/posts`
- `http://localhost:3000/api/posts/1`
- `http://localhost:3000/api/posts/999` (demonstrates the not-found path)

## Out of Scope

- Deep Nuxt deployment and hosting configuration
- Advanced caching and ISR patterns
- Pinia / global state management
- Real database or persistent backend
- Styling beyond basic readability

## Related Documents

- [`../TICKET.md`](../TICKET.md) — objective, scope, acceptance criteria, Definition of Done
- [`../REPORT.md`](../REPORT.md) — work completed, technical decisions, difficulties, evidence
- [`../docs/nuxt-routing.md`](../docs/nuxt-routing.md) — routing concepts and examples
- [`../docs/nuxt-layouts.md`](../docs/nuxt-layouts.md) — layouts and structure patterns
- [`../docs/nuxt-dataFetching.md`](../docs/nuxt-dataFetching.md) — fetching patterns and status handling
- [`../docs/nuxt-rendering-modes.md`](../docs/nuxt-rendering-modes.md) — SSR, SSG, CSR, and route-level control
