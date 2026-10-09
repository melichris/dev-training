# Ticket: Vitest Fundamentals — Unit Testing Composables & Utils

**Type:** Training / Skill Development
**Category:** Testing — Vitest / Vue 3
**Project:** New dedicated project (`nuxt-vitest-fundamentals`)
**Status:** Not Started

## Description

Build competency in unit testing using Vitest, focusing on testing pure utility functions, Zod schemas, and simple composables without needing a Nuxt runtime — the fastest, most isolated layer of the testing pyramid.

## Context / Background

All prior tickets were manually tested in the browser. Manual testing doesn't scale — it's slow, inconsistent, and can't be automated in CI. Vitest is the standard unit testing framework for Vite/Nuxt projects. Day 1 focuses on pure unit tests (no Nuxt or component context needed), before moving to component testing (Day 2) and Pinia store testing (Day 3).

## Detailed Description

### Core Features

**1. Vitest setup in a Nuxt project**

- Install and configure Vitest with `@nuxt/test-utils` and `happy-dom`
- Add a `test` script to `package.json`
- Confirm a passing test before writing real tests

**2. Testing utility functions**

- Write tests for a pure utility function (e.g. a string formatter or a number validator)
- Cover: happy path, edge cases, and expected failures

**3. Testing Zod schemas directly**

- Test `loginSchema` and `taskSchema` from the capstone project (or redefine them here)
- Verify valid data passes, invalid data fails with correct error messages
- Test the `registerSchema` cross-field `.refine()` check directly

**4. Testing a simple composable**

- Write a simple `useCounter` composable (`count`, `increment`, `decrement`, `reset`)
- Test it using Vitest — without mounting a component, using `withSetup` or a plain Vue app wrapper

### Technical Requirements

- Tests in a `tests/` or `__tests__/` directory
- Each test file named `*.test.ts`
- `describe` blocks grouping related tests, `it` blocks for individual cases
- No Nuxt runtime needed for Day 1 — plain Vitest environment only

### Out of Scope

- Component testing (Day 2)
- Pinia store testing (Day 3)
- Mocking API calls (Day 3)
- E2E testing (Day 4)

## Acceptance Criteria

- [ ] Vitest installed and configured, `npm test` runs successfully
- [ ] At least 3 utility function tests (happy path + edge cases)
- [ ] Zod schema tests covering valid, invalid, and cross-field cases
- [ ] Composable tested without mounting a component
- [ ] All tests pass with zero failures

## Definition of Done

- [ ] All tests passing
- [ ] Test output captured (terminal screenshot)
- [ ] Technical decisions documented
- [ ] Code committed
