# Weekly Work Report

**Ticket:** Playwright-e2e — E2E Basics with Playwright
**Project:** `nuxt-task-app` (capstone)
**Type:** Training / Skill Development

---

## Work Completed

- Installed `@playwright/test` with chromium only (`npx playwright install chromium`), after a clean reinstall
- Wrote `playwright.config.ts` by hand: `baseURL`, `workers: 1`, chromium project, `webServer` running `npm run build && npm run preview`
- Added `test:e2e` script and gitignored `test-results/` and `playwright-report/`
- `e2e/smoke.spec.ts`: login page renders
- `e2e/auth.spec.ts`: logged-out visit to `/tasks` redirects to `/login`; short credentials show both Zod validation errors; valid login redirects to `/tasks`
- `e2e/tasks.spec.ts`: create a task (unique title) and see it in the list; session survives a page reload

## Test Results

```
Running 6 tests using 1 worker

  ✓  1 …siting /tasks when logged out redirects to /login (174ms)
  ✓  2 …› Auth › short credentials show validation errors (682ms)
  ✓  3 ….ts:19:3 › Auth › valid login redirects to /tasks (705ms)
  ✓  4 …mium] › e2e/smoke.spec.ts:3:1 › login page renders (97ms)
  ✓  5 … Tasks › create a task and it appears in the list (725ms)
  ✓  6 …2:3 › Tasks › logged in session survives a reload (706ms)

Full suite:   6 passed (13.1s)
Repeat run:   tasks.spec.ts --repeat-each=5 -> 10 passed (21.3s)
```


## Technical Decisions

**Chromium only.** The wizard defaults ran webkit and firefox, which failed on missing system libraries. One browser is enough for Day 4 and avoids `sudo` dependencies.

**Production build for the webServer (`build && preview`) instead of `nuxt dev`.** Dev-server runs timed out with the button found but clicks hanging. The production build removed that instability and is closer to what E2E should exercise.

**`waitForLoadState('networkidle')` before interacting.** The URL `login?` in the early failures showed a native form submit: Playwright clicked before Vue hydrated, so `@submit.prevent` was not attached yet. Waiting for network idle fixed it.

**`workers: 1`.** The mock data lives in server memory, so tests share state. A single worker keeps runs deterministic.

**Unique task title per run (`E2E Task ${Date.now()}`).** Mock tasks persist in server memory across runs. A hardcoded title produced duplicates and a Playwright strict mode violation.

**Invalid login tested via Zod validation, not wrong credentials.** The mock login endpoint accepts any username/password that passes the schema, so wrong credentials cannot fail.

**`locator('#username')` over `getByLabel`.** Targeting ids directly was more reliable here.

## Difficulties / Blockers

| Problem | Resolution |
|---|---|
| Wizard asked for sudo OS dependencies; webkit/firefox failed | Skipped wizard defaults, installed chromium only |
| `page.goto('/login')` invalid URL | Config had no `baseURL`; wrote config by hand |
| Login tests stayed on `/login?` | Hydration race; added `waitForLoadState('networkidle')` and moved to production build |
| Strict mode violation on task title | Unique title per run |
| Reload test failed once, then passed | Not reproducible; 5 repeat runs all passed (10/10) |

## Acceptance Criteria

| Criteria | Status |
|---|---|
| Playwright installed and configured | Done |
| `npx playwright test` runs without error | Done |
| Login flow: valid credentials redirect to tasks | Done |
| Login flow: invalid input shows error | Done (Zod validation errors) |
| Auth guard: logged-out `/tasks` redirects to `/login` | Done |
| Task creation: task appears in list | Done |
| All E2E tests pass | Done (6/6) |

## Open Items

- Logout flow is not covered (logout button label not yet confirmed)
- The single earlier reload failure was never root-caused; it passed in all later runs, including the repeat run

## Definition of Done

| Requirement | Status |
|---|---|
| All tests passing | Done |
| Test output captured | Done |
| Technical decisions documented | Done |
| Screenshot | Done |
| Committed | Done |

## Next Step

**Day 5: TypeScript strictness** (strict mode, `noImplicitAny`, type-safe error handling).