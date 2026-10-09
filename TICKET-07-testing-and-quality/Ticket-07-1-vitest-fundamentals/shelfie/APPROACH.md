# APPROACH: Shelfie Implementation

## Architecture

```
types/book.ts              ← Book, NewBook, BookUpdate interfaces + union types
├─ app/composables/
│  ├─ useBookStore.ts      ← Pinia store (state + actions)
│  ├─ useBookApi.ts        ← Typed API client ($fetch wrappers)
│  ├─ useLocalDraft.ts     ← localStorage autosave for forms
│  └─ useReadingStats.ts   ← Computed stats from store
├─ app/components/
│  ├─ BookCard.vue         ← Display book + scoped slot
│  ├─ BookForm.vue         ← Form with Zod validation
│  ├─ RatingStars.vue      ← v-model:rating component
│  └─ StatusBadge.vue      ← Status display
├─ app/pages/
│  ├─ index.vue            ← List + search
│  ├─ books/[id].vue       ← Detail + edit
│  ├─ books/new.vue        ← Add form
│  └─ stats.vue            ← Reading stats
├─ app/layouts/default.vue ← Nav + provide/inject context
└─ server/api/books.ts     ← In-memory CRUD endpoints
```

## Build Order

1. **Types first** — define Book interface, utility types (Omit, Partial, Pick)
2. **Server routes** — GET/POST/PUT/DELETE endpoints with in-memory db
3. **API client** — typed composable wrapping $fetch calls
4. **Pinia store** — actions call API client, mutations update state
5. **Components** — build small → large (Badge → Card → Form)
6. **Pages** — wire components + store together
7. **Validation** — Zod schema + form error handling
8. **Persistence** — pinia-plugin-persistedstate config

## Key Decisions

- **Pinia over composable**: central state, devtools, persistence plugin
- **API client composable**: separation of concerns, easy to test/mock
- **Async actions**: all mutations go through API, store stays in sync
- **Zod validation**: runtime type checking, shared schema on client + server
- **Tailwind v4 Vite plugin**: no config file, auto-import in CSS

## State Flow

User action → Component emits → Page handler calls store action → Store calls API client → API route mutates DB → Response updates store → Component re-renders
