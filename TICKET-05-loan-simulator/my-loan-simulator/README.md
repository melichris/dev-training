# Nuxt Loan Affordability Simulator

A Nuxt 4 training project for calculating whether a loan payment fits within a safe affordability threshold based on monthly income. The app focuses on reusable composable logic, input-driven computed validation, and a simple report view that reacts to the user’s financial inputs.

**Ticket:** TICKET-05-loan-simulator
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript

## Features

- Loan amount input with numeric field and range slider
- Monthly income input with numeric field and range slider
- Loan term and interest inputs used in the affordability calculation
- Standard amortization formula for estimated monthly payment
- 30% debt-to-income affordability rule
- Live verdict showing whether the simulated loan is within the safe threshold
- Reusable composable that centralizes the form state and calculation logic

## Tech & Patterns Demonstrated

- **Nuxt 4 app structure:** `app/app.vue`, `app/components`, and `app/composables`
- **Composable logic:** `useLoanMath()` stores the state and exposes the calculation function
- **Reactive form state:** `ref()` values for the loan inputs and computed validity guard
- **Computed validation:** `isFormValid` only becomes true when all required values are provided
- **Financial calculation:** standard amortization formula to estimate monthly payment
- **Decision logic:** affordability checks against a 30% salary threshold

## Project Structure

```text
my-loan-simulator/
├── app/
│   ├── components/
│   │   ├── LoanForm.vue
│   │   └── LoanReport.vue
│   ├── composables/
│   │   └── useLoanMath.ts
│   └── app.vue
├── nuxt.config.ts
├── package.json
├── README.md
├── tsconfig.json
├── public/
└── .gitignore
```

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` to use the simulator.

## Type Checking

```bash
npx vue-tsc --build
```

## Out of Scope

- Real lender APIs or persisted loan data
- Amortization tables for every month of the repayment schedule
- Authentication or user accounts
- Advanced financial modeling beyond the simple affordability check

## Related Documents

- [`../TICKET.md`](../TICKET.md) — project objective, scope, and acceptance criteria
- [`../APPROACH.md`](../APPROACH.md) — planned implementation and technical decisions
- [`../REPORT.md`](../REPORT.md) — work completed, evidence, and summary
