# Implementation Approach — Task/Todo App Capstone

**Ticket:** Ticket-06-5-todo-app-with-zod-forms
**Project:** `nuxt-task-app` (new, dedicated Nuxt 4 project)

## Planned Approach — 10 Steps

1. **Scaffold & dependencies** — `npx nuxi@latest init nuxt-task-app`, install `pinia`, `@pinia/nuxt`, `zod`. Confirm dev server runs, initial commit.

2. **Define schemas** — `shared/schemas/index.ts` with:
   - `loginSchema`: `username` (min 3 chars), `password` (min 6 chars)
   - `taskSchema`: `title` (min 3 chars), `description` (optional string)
   - Infer TypeScript types from both

3. **Mock data** — create `server/data/tasks.ts` with 3-4 mock tasks, each with `id`, `title`, `description`, created similar to previous projects.

4. **Auth API endpoint** — `server/api/auth/login.post.ts`:
   - Read body, validate with `loginSchema`
   - Return `{ token: 'mock-token', username }` on success (hardcode the token for simplicity)
   - Throw `createError({ statusCode: 400, data: result.error.issues })` on invalid input

5. **Auth store** — `app/stores/authStore.ts`:
   - `user: { token, username } | null`, `status`, `isAuthenticated` getter
   - `login(username, password)` action calling `/api/auth/login` via typed API wrapper
   - `logout()` action clearing user
   - Persist to localStorage via `persist: true`

6. **Route middleware** — `app/middleware/auth.ts`:
   - Check if user is authenticated (`useAuthStore().isAuthenticated`)
   - Redirect to `/login` if not authenticated and the route requires auth
   - Apply this middleware to the `/tasks` route via `defineRouteMiddleware`

7. **Task API endpoints**:
   - `server/api/tasks/index.ts` (GET) — return all tasks
   - `server/api/tasks/index.post.ts` (POST) — create task, validate with `taskSchema`, add to mock data, return the created task
   - `server/api/tasks/[id].put.ts` — update task, validate, return updated task
   - `server/api/tasks/[id].delete.ts` — delete task

8. **Tasks store** — `app/stores/tasksStore.ts`:
   - `tasks: Task[]`, `status`
   - Async actions `fetchTasks()`, `createTask(title, description)`, `updateTask(id, updates)`, `deleteTask(id)` — all using typed API wrapper
   - No persistence (tasks refetch from server on page load)

9. **Pages & components**:
   - `app/pages/login.vue` — login form with Zod validation, redirects to `/tasks` on success
   - `app/pages/tasks/index.vue` — task list fetched via store on mount, create form, edit/delete buttons on each task
   - `app/components/TaskForm.vue` — reusable form for create/edit
   - `app/app.vue` — navigation (login/logout links), `<NuxtPage />`

10. **End-to-end test & evidence**:
    - Login, see task list, create a task, edit a task, delete a task
    - Reload page, confirm logged in and tasks persist/refetch
    - Logout, confirm redirect to login
    - Screenshots of each major state

## Why This Order

Authentication first (Steps 1-6) establishes the gating logic — everything else depends on being logged in. API endpoints (Step 7) defined before consuming them, same principle as every prior ticket. Stores built before pages so pages have a clear interface to call. End-to-end testing comes last, when the whole app can be exercised.

## Key Integration Points to Verify

- Pinia store actions call the typed API wrapper (no raw `$fetch`)
- Auth middleware blocks access to protected routes
- Task form uses the same Zod schema as the server endpoint
- localStorage persistence on auth state (login once, reload, still logged in)
- Server-side validation independent of client — submitting invalid data directly to API should be rejected

## Open Question / Risk

Tasks persistence — `tasksStore` can either fetch from server on every page load, or persist locally (similar to the auth example). Either is acceptable for this capstone. Decision and reasoning to be documented in the report.
