# REPORT: Shelfie Implementation Complete

## What Was Built

A full-stack typed Nuxt 4 book tracker with Pinia state management, API routes, form validation, and localStorage persistence.

## Steps Completed

### 1. Project Scaffold

- `npx nuxi@latest init shelfie` → Nuxt 4 setup
- `npm install pinia @pinia/nuxt tailwindcss @tailwindcss/vite zod pinia-plugin-persistedstate`
- Created folder structure: `app/`, `server/api/`, `types/`, `composables/`, `components/`, `pages/`, `stores/`

### 2. Types & Validation

- **`types/book.ts`** — Book interface with union status type + NewBook (Omit<Book, 'id'>) + BookUpdate (Partial<Book>)
- **`app/utils/validation.ts`** — Zod schema enforcing min-length rules on title/author, enum for status, optional rating

### 3. Server API

- **`server/api/books.ts`** — In-memory book db with GET (list/single), POST (create), PUT (update), DELETE (remove)
- Validation: 400 if title/author missing, 404 if book not found
- Returns typed Book objects

### 4. State Management

- **`app/stores/book.ts`** (Pinia) — Centralized state + actions
  - State: `books` ref, `loading`, `error`
  - Actions: `fetchBooks()`, `addBook()`, `updateBook()`, `removeBook()` (all async, call API client)
  - Getters: `totalBooks`, `finishedBooks`, `avgRating` (computed)
  - Config: `persist: { key: 'shelfie:books' }` + client-only plugin

### 5. API Client

- **`app/composables/useBookApi.ts`** — Typed wrapper around $fetch
  - `getBooks()`, `createBook(NewBook)`, `updateBook(id, BookUpdate)`, `deleteBook(id)`
  - All typed: parameters and return values match Book/NewBook/BookUpdate

### 6. Form Logic

- **`app/composables/useLocalDraft.ts`** — localStorage autosave
  - `saveDraft()` — watch on form saves to localStorage
  - `loadDraft()` — restore on mount
  - `clearDraft()` — cleanup after submit
- **`BookForm.vue`** — validation on submit
  - Validates via Zod, displays field-level errors
  - Prevents invalid submissions

### 7. Components

- **`StatusBadge.vue`** — displays status with color, uses Record utility type
- **`RatingStars.vue`** — renders stars, v-model:rating for two-way binding
- **`BookCard.vue`** — display book, scoped slot for custom actions, typed emits
- **`BookForm.vue`** — form with validation, autosave draft, reactive form state

### 8. Pages & Routing

- **`app/pages/index.vue`** — list books, search filter, calls `store.fetchBooks()` on mount
- **`app/pages/books/[id].vue`** — detail view with inline edit, calls `updateBook()` on save
- **`app/pages/books/new.vue`** — add form, calls `store.addBook()` on submit
- **`app/pages/stats.vue`** — displays totalBooks, finishedBooks, avgRating, readingProgress%
- **`app/layouts/default.vue`** — nav + provide/inject appContext
- **`app/app.vue`** — wraps pages in `<NuxtLayout>`

### 9. Testing & Fixes

- Fixed SSR localStorage error → client-only plugin guard
- Fixed `books.value` vs `books` (Pinia auto-unwrap) → removed `.value` on store state
- Fixed persistent store overwriting on page reload → only seed if `books.length === 0`
- Fixed validation errors not displaying → added error field to form

## Concepts Applied

| Week   | Concept                              | Implementation                                 |
| ------ | ------------------------------------ | ---------------------------------------------- |
| W1D1   | Types, Omit, Partial, Pick, Record   | Book interface, NewBook, BookUpdate, statusMap |
| W1D2   | Generics (indirect)                  | Zod schema validation                          |
| W1D3-4 | ref, reactive, computed, watch       | form state, draft autosave, stats computations |
| W2D1-2 | props, emits, slots, provide/inject  | BookCard, BookForm, layout context             |
| W2D4   | Composables                          | useBookApi, useLocalDraft, useReadingStats     |
| W3D1-3 | Nuxt routing, useFetch, useAsyncData | pages, fetchBooks(), data fetching             |
| W4D1   | Pinia stores                         | replaces manual composable, centralized state  |
| W4D2   | Persistence                          | pinia-plugin-persistedstate config             |
| W4D3   | API integration                      | typed $fetch client, async actions             |
| W4D4   | Validation                           | Zod schema, form error handling                |

## Status

✅ **Complete** — All CRUD operations work, data persists, validation prevents invalid submissions.

### Test Checklist

- [x] Add book → appears in list
- [x] Edit book → updates immediately + persists on refresh
- [x] Delete book → removed from list
- [x] Form validation → empty title shows error
- [x] Stats → totals compute correctly
- [x] Search → filters by title/author
- [x] Browser refresh → data survives (localStorage)

## Time Estimate

~4-5 hours of coding for someone following Week 1-4 curriculum end-to-end.
