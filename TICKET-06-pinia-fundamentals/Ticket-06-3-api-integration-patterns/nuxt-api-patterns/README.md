# Nuxt API Patterns

A small Nuxt 4 application for learning type-safe API integration patterns in a real application structure: shared response types, reusable fetch wrappers, server mock routes, and store-driven loading states.

**Ticket:** Ticket-06-3-api-integration-patterns
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Pinia, ofetch

## Purpose

This project focuses on the data layer patterns that sit between the UI and the backend. Instead of calling fetch directly inside components, the app centralizes network access in a typed wrapper and uses Pinia stores to manage async state.

## Concepts Covered

- **Typed API contracts** using shared TypeScript interfaces
- **Reusable fetch wrapper** built around `$fetch`
- **Mock server routes** under `server/api/`
- **Pinia stores** for loading, success, and error states
- **List + detail pages** consuming typed API results
- **Graceful error handling** for not-found responses

## Tech & Patterns Demonstrated

- **Nuxt server routes:** mock data from `server/api/users` and `server/api/posts`
- **Type safety:** shared types in `app/types/api.ts`
- **Reusable client layer:** `app/composables/useApi.ts`
- **Store-driven async flow:** `app/stores/usersStore.ts` and `app/stores/postsStore.ts`
- **Component-level rendering:** pages display loading, error, and success states based on store state
- **Strict TS discipline:** type-only imports for runtime-safe module syntax

## Project Structure

```text
nuxt-api-patterns/
├── app/
│   ├── app.vue
│   ├── composables/
│   │   └── useApi.ts
│   ├── pages/
│   │   ├── index.vue
│   │   ├── users/
│   │   │   ├── index.vue
│   │   │   └── [id].vue
│   │   └── posts/
│   │       ├── index.vue
│   │       └── [id].vue
│   ├── stores/
│   │   ├── usersStore.ts
│   │   └── postsStore.ts
│   └── types/
│       └── api.ts
├── server/
│   ├── api/
│   │   ├── users/
│   │   │   ├── index.ts
│   │   │   └── [id].ts
│   │   └── posts/
│   │       ├── index.ts
│   │       └── [id].ts
│   └── data/
│       ├── users.ts
│       └── posts.ts
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── public/
```

## Getting Started

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000`

## Verification

```bash
npm run build
npx nuxi typecheck
```

These checks confirm the project is building correctly and the strict TypeScript configuration passes without type errors.

## Out of Scope

- Real external APIs or authentication flows
- Pagination or advanced filtering
- Third-party HTTP libraries like Axios
- Production-grade data caching or retry policies

## Related Documents

- [`../TICKET.md`](../TICKET.md) — ticket scope, acceptance criteria, and learning goals
- [`../APPROACH.md`](../APPROACH.md) — implementation plan and technical approach
- [`../REPORT.md`](../REPORT.md) — final implementation summary and evidence
