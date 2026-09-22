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

- Static routes (`/`, `/about`)
- Nested route (`/posts`)
- Dynamic route (`/posts/[id]`)
- Client-side navigation via `<NuxtLink>`
- Two layouts: a default layout with navigation, and an alternate minimal layout applied per-page via `definePageMeta`
- Data fetching via `useFetch`, backed by real Nuxt server API routes
- Explicit loading and error states, including a verified not-found path for invalid post ids

## Tech & Patterns Demonstrated

- **Routing:** file-based routing under `app/pages/`, including dynamic segments
- **Layouts:** `<NuxtLayout>` / `<NuxtPage />`, per-page layout override via `definePageMeta`
- **Data fetching:** `useFetch`, with reactive `status`/`error` handling
- **Server routes:** mock backend under `server/api/`, including dynamic parameter resolution (`getRouterParam`) and proper HTTP error responses (`createError`)

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

- SSR/SSG deep-dive (planned as a follow-up session)
- Pinia / global state management
- Real database or persistent backend
- Styling beyond basic readability

## Related Documents

- [`TICKET.md`](./TICKET.md) — objective, scope, acceptance criteria, Definition of Done
- [`REPORT.md`](./REPORT.md) — work completed, technical decisions, difficulties, evidence
