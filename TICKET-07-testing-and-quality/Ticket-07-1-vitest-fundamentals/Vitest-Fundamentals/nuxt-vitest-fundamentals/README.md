# Nuxt Vitest Fundamentals

A focused Nuxt 4 training project for learning the fundamentals of unit testing with Vitest. The app is intentionally small and test-driven: it exercises pure utility functions, validates Zod schemas, and verifies a composable state pattern without depending on a full Nuxt runtime.

**Ticket:** TICKET-11-vitest-fundamentals
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Vitest, happy-dom, Zod

## Purpose

This project demonstrates the fastest layer of the testing pyramid: isolated unit tests for logic that can be validated without browser rendering or framework bootstrapping. It is designed to build confidence before moving into component testing, Pinia store testing, and broader app-level verification.

## Concepts Covered

- **Vitest setup** in a Nuxt project
- **Pure utility function testing** with happy-path and edge-case coverage
- **Zod schema validation** for login and registration rules
- **Composable testing** using a minimal Vue app wrapper (`withSetup` pattern)
- **Focus on test quality** rather than browser/manual validation alone

## Tech & Patterns Demonstrated

- **Vitest configuration:** `happy-dom` test environment and `npm test` workflow
- **Pure function testing:** validating formatting, numeric constraints, and boundary conditions
- **Schema validation:** `z.object()` and `.refine()` for cross-field rules
- **Composable logic:** `useCounter()` with `count`, `increment`, `decrement`, and `reset`
- **Test isolation:** no Nuxt runtime needed for Day 1 coverage

## Project Structure

```text
nuxt-vitest-fundamentals/
├── app/
│   ├── composables/
│   │   └── useCounter.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── app.vue
│   └── pages/
├── shared/
│   └── schemas/
│       └── index.ts
├── test/
│   ├── helpers.test.ts
│   ├── sanity.test.ts
│   └── useCounter.test.ts
├── .gitignore
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
├── public/
└── .nuxt/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

Start the Nuxt app in development mode:

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

## Production Build

```bash
npm run build
```

## Test Coverage Included

- Utility function tests for `formatUsername`, `isValidId`, and `clampNumber`
- Validation coverage for login and register schemas
- Reset behavior and state mutation tests for `useCounter()`
- Sanity check proving the test setup is working

## Out of Scope

- Component testing with Vue Test Utils
- Pinia store testing
- Mocking API requests or async data flows
- End-to-end browser automation

## Related Documents

- [`../TICKET.md`](../TICKET.md) — scope, acceptance criteria, and learning goals
- [`../APPROACH.md`](../APPROACH.md) — implementation plan and testing strategy
- [`../REPORT.md`](../REPORT.md) — completed work, test evidence, and technical decisions
