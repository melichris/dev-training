# Implementation Approach — E2E Basics with Playwright

**Ticket:** Playwright-e2e
**Project:** `nuxt-task-app` (capstone)

## Planned Approach

1. **Install Playwright** in `nuxt-task-app`:

   ```bash
   npm init playwright@latest
   ```

   Choose: TypeScript, `e2e` as test directory, no GitHub Actions, install browsers.

2. **Configure `playwright.config.ts`**:
   - `baseURL: 'http://localhost:3000'`
   - `webServer` block to start Nuxt automatically before tests
   - Single browser: Chromium only for Day 4

3. **Login flow tests** (`e2e/auth.spec.ts`):
   - Valid login: `page.goto('/login')` → fill username + password → click submit → assert redirected to `/tasks`
   - Invalid login: wrong credentials → assert error message visible

4. **Auth guard test** (`e2e/auth.spec.ts`):
   - `page.goto('/tasks')` when not logged in → assert redirected to `/login`

5. **Task creation test** (`e2e/tasks.spec.ts`):
   - Log in first (helper function)
   - Fill task form → submit → assert new task appears in list

## Key Rules

- `beforeAll` not `beforeEach` for server setup — Nuxt starts once per suite
- `page.getByRole()` and `page.getByLabel()` preferred over CSS selectors
- No `waitForTimeout()` — use Playwright auto-waiting via `expect(...).toBeVisible()`
- Tests are independent — each test manages its own login state
