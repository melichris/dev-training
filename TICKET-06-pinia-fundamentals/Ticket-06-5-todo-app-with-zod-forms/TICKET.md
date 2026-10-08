# Ticket: Capstone Build — Task/Todo App with Login

**Type:** Training / Capstone Integration
**Category:** Full-stack Nuxt 4 — Routing, Pinia, API Layer, Form Validation
**Project:** New dedicated Nuxt 4 project (`nuxt-task-app`)
**Status:** Awaiting QA review

## Description

Build a complete task/todo application integrating all core concepts from Days 1-4: file-based routing, Pinia state management with persistence, a typed REST API layer, and Zod form validation on both client and server. The app demonstrates a real-world workflow: user authentication, task CRUD operations, and persistent state across sessions.

## Context / Background

Days 1-4 built individual skills in isolation: routing fundamentals, Pinia mechanics and composition, typed API clients, and form validation. This capstone is the first time all four must work together in one coherent application — the true test of whether the patterns have been internalized well enough to integrate without tutoring.

## Detailed Description

### Core Features

**1. Authentication & Login**

- `POST /api/auth/login` endpoint accepting `{ username, password }` validated with Zod schema
- Returns `{ token, username }` on success, or validation error on failure
- `loginSchema` defined in `shared/schemas/`
- Login form component with field-level error display

**2. Session Management**

- `useAuthStore` Pinia store with `status`, `user: { token, username }`, and `login(username, password)` action
- `login` action calls the API endpoint via the typed API wrapper
- User state persisted to `localStorage` so they stay logged in across page reloads
- `logout()` action clearing both store and localStorage

**3. Task CRUD API**

- `GET /api/tasks` — list all tasks (returns `Task[]`)
- `POST /api/tasks` — create a task (body: `{ title, description }`)
- `PUT /api/tasks/[id]` — update a task (body: partial `Task`)
- `DELETE /api/tasks/[id]` — delete a task
- All endpoints validated server-side with Zod schemas

**4. Task Store & Persistence**

- `useTasksStore` Pinia store with `tasks`, `status`, and async actions `fetchTasks()`, `createTask(title, description)`, `updateTask(id, updates)`, `deleteTask(id)`
- Optionally persist tasks to localStorage (or refresh from server on each page load — either is acceptable for this scope)
- Actions use the typed API wrapper to call server endpoints

**5. Task Form & Validation**

- Create/edit task form with `title` (min 3 chars) and `description` (optional)
- Zod schema for validation — shared between client form and server endpoint
- Field-level error display on form submit

**6. Pages & Navigation**

- `/login` — login form, redirects to `/tasks` on successful auth
- `/tasks` — task list view with create form, display all tasks, edit/delete buttons
- Route protection — accessing `/tasks` without auth redirects to `/login`

### Technical Requirements

- TypeScript throughout with no implicit `any`
- `safeParse` (never `parse`) for all Zod validation
- Pinia store actions use the typed API wrapper (no raw `$fetch` in components)
- Authentication state persisted (localStorage or session-based, either is fine)
- All server endpoints validate input server-side, independent of client validation
- Field-level form errors using `err.path[0]`

### Out of Scope

- User registration (login only, no signup flow)
- Real database (mock tasks in-memory, served from a `server/data/tasks.ts` file)
- JWT token verification on the server (accept any token for this exercise; a real app would verify the JWT)
- Task filtering/sorting (flat list only)

## Acceptance Criteria

- [ ] Login form validates with Zod, submits to `/api/auth/login`, stores user in `useAuthStore`
- [ ] User state persists across page reload
- [ ] Accessing `/tasks` without auth redirects to `/login`
- [ ] Task list displays from `useTasksStore`, populated via `/api/tasks` on page load
- [ ] Creating a task validates client-side, submits to `/api/tasks`, appears in the list
- [ ] Updating a task via `PUT /api/tasks/[id]` works and is reflected in the store
- [ ] Deleting a task via `DELETE /api/tasks/[id]` removes it from the list
- [ ] Server endpoints validate all input independently of client validation
- [ ] Logging out clears user state and redirects to `/login`
- [ ] No TypeScript errors (`npx nuxt typecheck` clean)

## Risks & Open Points

- **Risk:** Checking authentication only in the component — middleware/route protection should be implemented at the route level via Nuxt's `middleware` directory or `defineRouteMiddleware`.
  → **Mitigation:** Route protection implemented via middleware, not just a component-level `v-if`.
- **Risk:** Mixing authenticated and unauthenticated endpoints on the same project without a way to simulate "logged out" state.
  → **Mitigation:** Mock tasks are not stored per-user — all logged-in users see the same tasks for simplicity (a real app would filter by user).
- **Open Point:** Whether to persist tasks to localStorage or refetch from server on page load — either is acceptable for this scope, decision to be made during implementation.

## Definition of Done

- [ ] Full app implementation completed and manually tested end-to-end
- [ ] All CRUD operations tested (create, read, update, delete)
- [ ] Login/logout and route protection verified
- [ ] Server-side validation tested with both valid and invalid input
- [ ] Code compiles with zero TypeScript errors
- [ ] Evidence captured (screenshots of login, task list, create/edit/delete, and server error)
- [ ] Technical decisions documented
- [ ] Code committed with descriptive messages
