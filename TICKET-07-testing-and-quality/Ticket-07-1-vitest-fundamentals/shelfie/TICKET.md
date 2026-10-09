# TICKET: Build Shelfie — Typed Book Tracker App

## Summary

Build a full-stack typed book tracker (Vue 3 + Nuxt 4 + Pinia + TypeScript) with CRUD operations, persistence, and form validation.

## User Story

As a reader, I want to track books I own, their reading status, ratings, and notes so I can manage my personal library and track reading progress.

## Detailed Description

- Add/edit/delete books with title, author, status (unread/reading/finished), rating, notes
- View all books with search/filter
- Persist data across browser sessions
- Validate form inputs before submission
- Display reading stats (total, finished, progress %, avg rating)

## Acceptance Criteria

- [x] TypeScript interfaces for Book, NewBook, BookUpdate
- [x] Pinia store with CRUD actions
- [x] Server API routes (GET list, POST create, PUT update, DELETE remove)
- [x] Typed API client composable
- [x] Form validation with Zod
- [x] LocalStorage persistence
- [x] Pages: list, detail (with edit), add, stats
- [x] Components: BookCard, BookForm, RatingStars, StatusBadge
- [x] All mutations async through API

## Technical Notes

- Nuxt 4 with compatibilityVersion: 4
- Pinia + pinia-plugin-persistedstate
- Zod for runtime validation
- Tailwind CSS v4 via Vite plugin
- In-memory server DB (can swap for real DB)

## Definition of Done

- [x] App runs locally without errors
- [x] All CRUD operations work
- [x] Persistence survives hard refresh
- [x] Validation prevents invalid submissions
- [x] Stats compute correctly
