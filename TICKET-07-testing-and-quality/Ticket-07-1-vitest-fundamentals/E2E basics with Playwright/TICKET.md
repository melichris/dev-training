# Ticket: E2E Basics — Playwright

**Type:** Training / Skill Development
**Category:** Testing — E2E / Playwright
**Project:** `nuxt-task-app` (capstone from TICKET-06-5)
**Status:** E2E implementation reported complete; reviewer sign-off pending

## Description

Set up Playwright and write first end-to-end tests against the capstone task app — testing real user journeys in a real browser against a running Nuxt server.

## Acceptance Criteria

- [x] Playwright installed and configured in `nuxt-task-app`
- [x] `npx playwright test` runs without error as recorded in `REPORT.md`
- [x] Login flow tested: schema-valid credentials → redirected to tasks page
- [x] Login form tested: credentials failing Zod field validation → validation errors visible
- [x] Auth guard tested: visiting `/tasks` when logged out → redirected to `/login`
- [x] Task creation tested: fill form, submit, task appears in list
- [x] All E2E tests pass as recorded in `REPORT.md`

## Definition of Done

- [x] All tests passing as recorded in `REPORT.md`
- [x] Test output captured in `REPORT.md`
- [x] Technical decisions documented
- [x] E2E tests committed with the TICKET-06-5 capstone project
