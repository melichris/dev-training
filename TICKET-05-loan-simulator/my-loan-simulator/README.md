# Nuxt Loan Affordability Simulator

A Nuxt 4 training project that estimates a fixed-rate loan's monthly payment
and compares it with a borrower's monthly income. The estimate is not a lender
approval or creditworthiness decision.

**Ticket:** [TICKET-05](../TICKET.md)
**Stack:** Nuxt 4, Vue 3, TypeScript, Vitest

## Features

- Loan principal, annual interest rate, term in months, and monthly income
  inputs.
- Fixed-rate amortization calculation, including zero-interest loans.
- USD payment display to two decimal places.
- 30% monthly-income affordability indicator.
- Unit tests for reference cases and invalid calculation inputs.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to use the simulator.

## Validation

```bash
npm test
npm run typecheck
npm run build
```

## Calculation Scope

The estimate uses the standard fixed-rate amortization formula with an annual
nominal rate divided by 12. At 0% interest, it divides principal evenly over
the number of monthly payments. Principal and the displayed payment retain
cent precision. The application does not calculate an amortization schedule,
total interest, fees, or lender-specific final installments.

## Related Documents

- [Ticket and acceptance criteria](../TICKET.md)
- [Implementation approach](../APPROACH.md)
- [Verification report](../REPORT.md)
