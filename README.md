# Dev Training

Training exercises and reference projects covering Vue, Nuxt, state management,
forms, and testing. Each ticket is organized as its own learning track; runnable
applications are nested inside some tracks.

## Learning tracks

- [Vue fundamentals](Vue-fundametals/README.md) — Vue 3, Vite, and TypeScript examples.
- [TICKET-02: Recipe Book](TICKET-02-recipe-book/TICKET.md) — Vue 3 recipe management with reactive state, composables, and CRUD operations. App: [recipe-book/](TICKET-02-recipe-book/recipe-book/).
- [TICKET-03: Expense Tracker](TICKET-03-expense-tracker/TICKET.md) — Vue 3 expense tracking with forms, category filtering, and reactive totals. App: [expense-tracker/](TICKET-03-expense-tracker/expense-tracker/).
- [TICKET-04: Nuxt Fundamentals](TICKET-04-nuxt-fundamentals/TICKET.md) — Nuxt 4 routing, layouts, and data fetching. App: [nuxt-fundamentals/](TICKET-04-nuxt-fundamentals/nuxt-fundamentals/).
- [TICKET-05: Loan Simulator](TICKET-05-loan-simulator/TICKET.md) — loan-simulation project. App: [my-loan-simulator/](TICKET-05-loan-simulator/my-loan-simulator/).
- [TICKET-06: Pinia Fundamentals](TICKET-06-pinia-fundamentals/) — a progressive Pinia and Nuxt learning series:
  - [06-1: Store state, getters, and actions](TICKET-06-pinia-fundamentals/Ticket-06-1-pinia-store-state-getters-actions/TICKET.md) — [nuxt-with-pinia/](TICKET-06-pinia-fundamentals/Ticket-06-1-pinia-store-state-getters-actions/nuxt-with-pinia/).
  - [06-2: Composition and persistence](TICKET-06-pinia-fundamentals/Ticket-06-2-pinia-composition-persistence/TICKET.md) — [nuxt-with-pinia-2/](TICKET-06-pinia-fundamentals/Ticket-06-2-pinia-composition-persistence/nuxt-with-pinia-2/).
  - [06-3: API integration patterns](TICKET-06-pinia-fundamentals/Ticket-06-3-api-integration-patterns/TICKET.md) — [nuxt-api-patterns/](TICKET-06-pinia-fundamentals/Ticket-06-3-api-integration-patterns/nuxt-api-patterns/).
  - [06-4: Form handling and Zod validation](TICKET-06-pinia-fundamentals/Ticket-06-4-form-handling-and-Zod-validation/TICKET.md) — [nuxt-zod-forms/](TICKET-06-pinia-fundamentals/Ticket-06-4-form-handling-and-Zod-validation/nuxt-zod-forms/).
  - [06-5: Task app capstone](TICKET-06-pinia-fundamentals/Ticket-06-5-todo-app-with-zod-forms/TICKET.md) — [nuxt-task-app/](TICKET-06-pinia-fundamentals/Ticket-06-5-todo-app-with-zod-forms/nuxt-task-app/).
- [TICKET-07: Testing and Quality](TICKET-07-testing-and-quality/) — Vitest fundamentals, unit testing resources, Pinia store tests, Vue Test Utils, and Playwright E2E exercises. Projects and exercise tickets are in [Ticket-07-1-vitest-fundamentals/](TICKET-07-testing-and-quality/Ticket-07-1-vitest-fundamentals/), including [shelfie/](TICKET-07-testing-and-quality/Ticket-07-1-vitest-fundamentals/shelfie/) and [nuxt-vitest-fundamentals/](TICKET-07-testing-and-quality/Ticket-07-1-vitest-fundamentals/Vitest-Fundamentals/nuxt-vitest-fundamentals/).

## Running a project

Projects are independent and may be nested within a learning track. Open the
specific application directory containing its `package.json`, install
dependencies using the package manager and lockfile provided there, then run
the project's development script. For npm-based projects:

```bash
cd <path-to-application>
npm install
npm run dev
```

Check that application's `package.json` and README for its runtime requirements
and available scripts. Type-check and test commands also vary by project; use
the commands documented in the project or ticket rather than assuming one
command applies to the whole collection.

## Contributing

Improvements and fixes are welcome. Work within the relevant learning track or
application directory, and consult its ticket or README for project-specific
context.
