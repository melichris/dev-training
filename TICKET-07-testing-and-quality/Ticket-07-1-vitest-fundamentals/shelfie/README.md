# Shelfie

A Nuxt 4 + Pinia book-tracking application built to practice typed CRUD patterns, persisted state, Zod validation, and API-driven data flows in a realistic full-stack training app.

**Ticket:** Build Shelfie — Typed Book Tracker App
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Pinia, Tailwind CSS, Zod

## Purpose

This project focuses on building a personal library manager where a user can add, view, edit, delete, and rate books while keeping the state synchronized with a local API layer and persisted across browser refreshes.

## Features

- Add, edit, and delete books with typed data models
- Track book status across `unread`, `reading`, and `finished`
- Store ratings and notes for each title
- Search and filter books in the library view
- Persist library state with Pinia persistence
- Validate form input before creating or updating entries
- Show overall reading statistics such as totals and average rating

## Tech & Patterns Demonstrated

- **Nuxt 4 app structure:** pages, components, layouts, composables, shared types, and server routes
- **Pinia stores:** centralized state and computed summaries for book data
- **Typed domain model:** `Book`, `NewBook`, and `BookUpdate` interfaces
- **API-style mutations:** asynchronous CRUD calls routed through a Nuxt server API
- **Runtime validation:** Zod schema checks for invalid form submissions
- **Persistence:** `pinia-plugin-persistedstate` keeps state across browser sessions
- **UI patterns:** reusable cards, badge status components, and rating display controls

## Project Structure

```text
shelfie/
├── app/
│   ├── components/
│   │   ├── BookCard.vue
│   │   ├── BookForm.vue
│   │   ├── RatingStars.vue
│   │   └── StatusBadge.vue
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   │   ├── books/
│   │   ├── index.vue
│   │   └── stats.vue
│   ├── plugins/
│   ├── stores/
│   │   └── book.ts
│   ├── types/
│   ├── utils/
│   └── app.vue
├── server/
│   └── api/
│       └── books.ts
├── public/
├── APPROACH.md
├── REPORT.md
├── TICKET.md
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

## Production Build

```bash
npm run build
```

## Out of Scope

- Real database integration or authentication
- Multi-user library syncing across devices
- Advanced recommendation or search ranking features
- Backend deployment beyond the local Nuxt server API pattern

## Related Documents

- [`./TICKET.md`](./TICKET.md) — ticket summary, acceptance criteria, and delivery requirements
- [`./APPROACH.md`](./APPROACH.md) — implementation plan and technical decisions
- [`./REPORT.md`](./REPORT.md) — completed work and validation notes
