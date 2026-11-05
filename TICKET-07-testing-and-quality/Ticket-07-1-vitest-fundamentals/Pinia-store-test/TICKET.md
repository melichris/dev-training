# Ticket: Testing Pinia Stores + Mocking API Calls

**Type:** Training / Skill Development
**Category:** Testing — Pinia / Vitest / Mocking
**Project:** `nuxt-vitest-fundamentals` (continuation)
**Status:** Implementation and tests verified locally on 2026-11-05; reviewer sign-off pending

## Description

Build competency in testing Pinia stores in isolation — testing state, getters, and actions — and mocking API calls so store actions can be tested without real HTTP requests.

## Acceptance Criteria

- [x] Pinia store tested with `setActivePinia(createPinia())` isolation
- [x] State and getters asserted directly
- [x] Action that mutates state tested
- [x] Action that calls `$fetch` tested with `vi.mock()`
- [x] Mock resolves successfully — assert state updated correctly
- [x] Mock rejects — assert error state handled correctly

## Definition of Done

- [x] All tests passing
- [x] `npm test` output captured in the report and current verification addendum
- [x] Technical decisions documented
- [ ] Code committed — remediation changes remain uncommitted
