# TICKET-05: Loan Affordability Simulator

**Type:** Training / Skill Development
**Status:** Implemented; ticket documented retroactively on 2026-11-04

## Objective

Build a Nuxt 4 application that estimates the monthly payment for a fixed-rate,
fully amortizing loan and compares it with a borrower's monthly income.

## Scope

- Accept principal, annual nominal interest rate, term in months, and monthly
  income.
- Calculate the monthly payment with a pure TypeScript utility.
- Show the payment in USD and indicate whether it is at or below 30% of income.
- Update the result when valid inputs change after the user runs a simulation.

## Out of Scope

- Variable rates, fees, insurance, and early repayment.
- An amortization schedule, lender-specific final-payment adjustments, and
  total-interest reporting.
- Persistence, authentication, and backend services.
- A lender approval or creditworthiness determination.

## Calculation and Input Decisions

- Loan type: fixed-rate, fully amortizing.
- Formula: `M = P × r / (1 - (1 + r)^(-n))`, where `P` is principal, `r` is the
  monthly rate, and `n` is the number of monthly payments.
- Rate conversion: annual nominal percentage divided by 100 and then by 12.
- Zero interest: when `r` is zero, use `M = P / n`.
- Rounding: convert principal to integer cents and round the estimated monthly
  payment to the nearest cent. The application does not generate a repayment
  schedule or claim to calculate a lender's final installment.
- Money and currency: USD, represented as integer cents for payment calculation
  and formatted with the `en-US` locale.
- Input limits: principal $1,000–$1,000,000; annual rate 0–100%; term 1–360
  whole months; monthly income $500–$20,000. Missing, non-finite, and
  out-of-range values are invalid.
- Outputs: estimated monthly payment and an affordability indication based on
  the 30% monthly-income threshold.
- Reference formula: [Microsoft Excel PMT function](https://support.microsoft.com/en-us/excel/functions/pmt-function),
  which defines fixed periodic payments and the periodic-rate/payment-count
  convention used here. The listed reference cases were independently
  recalculated with the formula before being added as tests.

## Acceptance Criteria

- [x] $10,000 at 5% for 12 months produces a monthly payment of $856.07.
- [x] $10,000 at 0% for 12 months produces a monthly payment of $833.33.
- [x] $200,000 at 6% for 360 months produces a monthly payment of $1,199.10.
- [x] Payments retain cents and display exactly two decimal places.
- [x] Invalid principal, rate, and term values are rejected by the calculation
      utility and cannot be submitted from the form.
- [x] Valid input changes update the displayed calculation and affordability
      result.
- [x] Calculation cases and invalid-input handling are covered by unit tests.

## Definition of Done

- [x] Acceptance cases pass in the unit test suite.
- [x] Nuxt type-check and production build complete successfully.
- [x] The application README documents installation, running, testing, and
      type-check commands.
- [x] The implementation and evidence are recorded in `REPORT.md`.
