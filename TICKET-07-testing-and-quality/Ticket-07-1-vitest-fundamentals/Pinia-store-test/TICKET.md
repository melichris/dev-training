# Ticket: Testing Pinia Stores + Mocking API Calls

**Type:** Training / Skill Development
**Category:** Testing — Pinia / Vitest / Mocking
**Project:** `nuxt-vitest-fundamentals` (continuation)
**Status:** Not Started

## Description

Build competency in testing Pinia stores in isolation — testing state, getters, and actions — and mocking API calls so store actions can be tested without real HTTP requests.

## Acceptance Criteria

- [ ] Pinia store tested with `setActivePinia(createPinia())` isolation
- [ ] State and getters asserted directly
- [ ] Action that mutates state tested
- [ ] Action that calls `$fetch` tested with `vi.mock()`
- [ ] Mock resolves successfully — assert state updated correctly
- [ ] Mock rejects — assert error state handled correctly
- [ ] All tests pass with zero failures

## Definition of Done

- [ ] All tests passing
- [ ] `npm test` output captured
- [ ] Technical decisions documented
- [ ] Committed
