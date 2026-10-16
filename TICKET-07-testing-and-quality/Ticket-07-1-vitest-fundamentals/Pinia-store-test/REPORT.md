# Weekly Work Report

**Ticket:** Pinia-store-testing — Testing Pinia Stores + Mocking API Calls
**Project:** `nuxt-vitest-fundamentals`
**Type:** Training / Skill Development

---

## Work Completed

- Installed Pinia in the existing Vitest project
- Built `useCounterStore` (options style: `count`, `doubleCount` getter, `increment`, `reset`) and tested initial state, mutations, getter, and reset
- Built `useApi` composable wrapping `globalThis.$fetch` with typed `ApiResponse<T>` return shape
- Built `usePostsStore` with `fetchPosts` action calling `useApi().$fetch` and managing `status` and `error` state
- Tested `usePostsStore`: initial state, success path (mock resolves with 2 posts), error path (mock returns `error` string)

## Test Results

```
✓ test/components/AsyncMessage.test.ts      (2 tests)
✓ test/components/Counter.test.ts           (3 tests)
✓ test/components/HelloUser.test.ts         (3 tests)
✓ test/components/TaskForm.test.ts          (4 tests)
✓ test/stores/useCounterStore.test.ts       (4 tests)
✓ test/stores/usePostsStore.test.ts         (3 tests)
✓ test/useCounter.test.ts                   (4 tests)
✓ test/helpers.test.ts                      (6 tests)
✓ test/sanity.test.ts                       (1 test)

Test Files: 9 passed
Tests:      30 passed
Duration:   3.07s
```

## Technical Decisions

**`setActivePinia(createPinia())` in `beforeEach` only** — calling `reset()` on the store inside `beforeEach` is redundant since `createPinia()` already produces a fresh instance with initial state for every test.

**`useApi` must be `vi.fn()` for per-test overrides** — the top-level `vi.mock()` sets the default mock for all tests. To override it for a specific test (error path), `useApi` itself must be a `vi.fn()` so `vi.mocked(useApi).mockReturnValueOnce()` works. A plain arrow function cannot be overridden this way.

**Avoided patching `globalThis.$fetch` directly** — directly replacing `globalThis.$fetch` in a test bypasses `vi.mock()`, is not automatically restored, and can leak state between tests. `vi.mock()` + `vi.mocked()` is the correct pattern.

**Skipped loading status race condition test** — asserting `status === 'loading'` between calling and awaiting `fetchPosts()` is non-deterministic in a test environment. Out of scope for Day 3.

## Difficulties / Blockers

| Problem                                                | Resolution                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `vi.mock()` inside `describe` not hoisted correctly    | Moved to top of file at module level                                               |
| `[...]` invalid syntax in mock data                    | Replaced with actual typed mock objects                                            |
| `vi.mocked(...).mockReturnValueOnce is not a function` | Changed `useApi` from plain arrow function to `vi.fn(() => ...)` in top-level mock |

## Acceptance Criteria

| Criteria                                                          | Status     |
| ----------------------------------------------------------------- | ---------- |
| Pinia store tested with `setActivePinia(createPinia())` isolation | ✅         |
| State and getters asserted directly                               | ✅         |
| Action that mutates state tested                                  | ✅         |
| Action that calls `$fetch` tested with `vi.mock()`                | ✅         |
| Mock resolves successfully — state updated correctly              | ✅         |
| Mock rejects — error state handled correctly                      | ✅         |
| All tests pass with zero failures                                 | ✅ (30/30) |

## Definition of Done

| Requirement                    | Status |
| ------------------------------ | ------ |
| All tests passing              | ✅     |
| `npm test` output captured     | ✅     |
| Technical decisions documented | ✅     |
| Test Result                    | ✅     |
| Committed                      | ✅     |

## Next Step

**Day 4 — E2E basics: Playwright setup and first end-to-end tests.**
