# Ticket: E2E Basics — Playwright

**Type:** Training / Skill Development
**Category:** Testing — E2E / Playwright
**Project:** `nuxt-task-app` (capstone from TICKET-06-5)
**Status:** Not Started

## Description

Set up Playwright and write first end-to-end tests against the capstone task app — testing real user journeys in a real browser against a running Nuxt server.

## Acceptance Criteria

- [ ] Playwright installed and configured in `nuxt-task-app`
- [ ] `npx playwright test` runs without error
- [ ] Login flow tested: valid credentials → redirected to tasks page
- [ ] Login flow tested: invalid credentials → error message visible
- [ ] Auth guard tested: visiting `/tasks` when logged out → redirected to `/login`
- [ ] Task creation tested: fill form, submit, task appears in list
- [ ] All E2E tests pass

## Definition of Done

- [ ] All tests passing
- [ ] Test output captured
- [ ] Technical decisions documented
- [ ] Committed
