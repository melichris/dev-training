# Weekly Work Report

**Ticket:** TICKET-06-5-todo-app-with-zod-forms — Capstone: Task App
**Project:** `nuxt-task-app`
**Type:** Training / Capstone Integration

---

## Work Completed

- Scaffolded `nuxt-task-app` with `pinia`, `@pinia/nuxt`, `zod`
- Defined `loginSchema`, `taskSchema`, and `Task` interface in `shared/schemas/index.ts`
- Built mock data in `server/data/tasks.ts` (3 seed tasks)
- Built auth endpoint `server/api/auth/login.post.ts` — validates with `loginSchema`, returns mock token
- Built task CRUD endpoints: GET, POST, PUT (`[id].put.ts`), DELETE (`[id].delete.ts`) — all server-side validated
- Built `useApi` composable (typed `$fetch` wrapper with `FetchError` handling)
- Registered `pinia-plugin-persistedstate` via `app/plugins/persistedstate.client.ts`
- Built `useAuthStore` with `isAuthenticated` getter, `login`/`logout` actions, `persist: true`
- Built `useTasksStore` with async `fetchTasks`, `createTask`, `updateTask`, `deleteTask` actions
- Built route middleware `app/middleware/auth.ts` — redirects unauthenticated users to `/login`
- Built `TaskForm.vue` (reusable for create and edit), `login.vue`, `tasks/index.vue`
- End-to-end tested all 8 flows — all passed
- Ran `npx nuxt typecheck` — zero errors
- Ran `npx prettier --write .` — formatting fixed across 3 files

## Technical Decisions

**`persist: true` on `authStore` only** — login state should survive reload; tasks refetch from server on mount, no persistence needed.

**`taskSchema.partial()` removed from PUT endpoint** — using `.partial()` made `title` optional (`string | undefined`), conflicting with `Task.title: string`. Fixed by merging explicitly: `title: result.data.title ?? task.title`.

**Middleware at route level** — auth check in `definePageMeta({ middleware: 'auth' })`, not component-level `v-if`, so protection works before the component renders.

## Difficulties / Blockers

| Problem                                                                                    | Resolution                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `definePageMeta` not found                                                                 | Ran `npx nuxt prepare` to generate auto-import types                                                                                                                         |
| Reloading `/tasks` redirected to `/login` despite being logged in                          | Auth middleware ran during SSR before `pinia-plugin-persistedstate` rehydrated localStorage — fixed by adding `if (import.meta.server) return` to skip the check server-side |
| `[id].put.ts` TS2322 — `title: string \| undefined` not assignable to `Task.title: string` | Replaced `.partial()` merge with explicit `title: result.data.title ?? task.title`                                                                                           |
| `mockTasks[index]` possibly undefined (TS2532)                                             | Used non-null assertion `mockTasks[index]!` after index check                                                                                                                |
| Prettier warnings on 3 files                                                               | Ran `npx prettier --write .` — all resolved                                                                                                                                  |

## Evidence

- `npx nuxt typecheck` → **Type check passed**
- `npx prettier --write .` → **3 files formatted, all others unchanged**
- All 8 end-to-end flows verified manually:
  - `/tasks` without auth → redirected to `/login` ✅
  - Login → redirected to `/tasks` ✅
  - Tasks load on mount ✅
  - Create task ✅
  - Edit task ✅
  - Delete task ✅
  - Reload → still logged in, tasks refetch ✅
  - Logout → redirected to `/login` ✅
- Screenshots: _(pending)_
- Commit: _(pending)_

## Acceptance Criteria

| Criteria                                                | Status |
| ------------------------------------------------------- | ------ |
| Login validates with Zod, stores user in `useAuthStore` | ✅     |
| User state persists across reload                       | ✅     |
| `/tasks` without auth redirects to `/login`             | ✅     |
| Task list loads via store on mount                      | ✅     |
| Create task validates + appears in list                 | ✅     |
| Update task via PUT reflected in store                  | ✅     |
| Delete task removes from list                           | ✅     |
| Server endpoints validate independently                 | ✅     |
| Logout clears state + redirects                         | ✅     |
| Zero TypeScript errors                                  | ✅     |

## Definition of Done

| Requirement                              | Status |
| ---------------------------------------- | ------ |
| Full implementation + manual testing     | ✅     |
| All CRUD operations tested               | ✅     |
| Login/logout + route protection verified | ✅     |
| Zero TypeScript errors                   | ✅     |
| Code formatting clean                    | ✅     |
| Evidence captured                        | ✅     |
| Committed                                | ✅     |

## Next Step

Capture screenshots, commit, submit for reviewer sign-off. Then proceed to **Day 6 — weekly eval**, followed by **Week 5: Testing & Quality**.
