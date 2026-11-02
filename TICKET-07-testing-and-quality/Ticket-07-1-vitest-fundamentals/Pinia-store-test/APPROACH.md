# Implementation Approach — Testing Pinia Stores + Mocking API Calls

**Ticket:** TICKET-13-pinia-store-testing
**Project:** `nuxt-vitest-fundamentals` (continuation)

## Planned Approach

1. **Install Pinia** — `npm install pinia` in the existing project.

2. **Simple store tests** — create `app/stores/useCounterStore.ts` (options style: `state: count`, `getters: doubleCount`, `actions: increment, reset`). Test in `tests/stores/useCounterStore.test.ts`:
   - Initial state is correct
   - `increment` updates `count`
   - `doubleCount` getter returns correct value
   - `reset` returns state to initial value
   - `setActivePinia(createPinia())` in `beforeEach`

3. **Store with API action** — create `app/stores/usePostsStore.ts` (options style: `state: posts[], status, error`, `actions: fetchPosts`). `fetchPosts` calls `useApi().$fetch('/api/posts')`.
   - Create `app/composables/useApi.ts` with `$fetch` wrapping global `$fetch`
   - Mock `useApi` with `vi.mock()`
   - Test success path: mock resolves → `posts` populated, `status: 'success'`
   - Test error path: mock rejects → `error` set, `status: 'error'`

## Key Rules

- `setActivePinia(createPinia())` in `beforeEach` — fresh store per test
- `vi.mock()` hoisted to top of file automatically by Vitest — declare it outside `describe`
- `await store.fetchPosts()` — always await async actions
- Assert `status` AND `data` — both must be correct for the test to be meaningful
