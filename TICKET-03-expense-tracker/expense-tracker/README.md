# Vue Expense Tracker Dashboard

A small Vue 3 + TypeScript expense dashboard built to practice component composition, reactive state, computed values, and form validation. The app loads a set of mock expenses, filters them by category, summarizes the total spend and unpaid items, and lets the user add a new expense.

**Ticket:** TICKET-03-expense-tracker
**Type:** Training / Skill Development
**Stack:** Vue 3, Vite, TypeScript

## Features

- Loading and success/error state handling while mock data is fetched
- Expense summary cards for total spend and unpaid bill count
- Category filter buttons for `all`, `food`, `transport`, `bills`, `wife`, and `others`
- Add-expense form with validation for required description and positive amount values
- Toggle paid/unpaid state for each expense row
- Centralized composable logic for state management and derived values

## Tech & Patterns Demonstrated

- **Vue components:** dashboard shell, totals summary, filter section, form, and list rows
- **Composable state management:** `useExpenses()` handles data loading, filtering, totals, and actions
- **Reactive refs + computed values:** summary totals and filtered results are derived from state
- **Form validation:** description and amount checks before adding a transaction
- **Type-safe domain model:** typed categories, expense entries, and new-expense payloads

## Project Structure

```text
expense-tracker/
├── src/
│   ├── components/
│   │   ├── ExpenseTracker.vue
│   │   ├── ExpenseForm.vue
│   │   ├── ExpenseList.vue
│   │   ├── ExpenseRow.vue
│   │   └── TotalsDisplay.vue
│   ├── composables/
│   │   └── useExpenses.ts
│   ├── data/
│   │   └── mockExpenses.ts
│   ├── types/
│   │   └── types.ts
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── public/
```

## Getting Started

```bash
npm install
npm run dev
```

Then open the local Vite URL in the browser to use the tracker.

## Production Build

```bash
npm run build
```

## Type Checking

```bash
npm run type-check
```

## Out of Scope

- Persistent storage or backend database integration
- Authentication and user accounts
- Real bank or payment API connectivity
- Advanced analytics beyond the simple expense dashboard summary

## Related Documents

- [`../TICKET.md`](../TICKET.md) — objective, requirements, and acceptance criteria
- [`../APPROACH.md`](../APPROACH.md) — planned implementation and technical decisions
- [`../REPORT.md`](../REPORT.md) — completed work, evidence, and reflection
