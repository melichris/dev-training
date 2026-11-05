# Approach: TICKET-05 Loan Affordability Simulator

**Documented:** 2026-11-04
**Note:** This captures the implementation decisions retrospectively; it does
not imply the approach was approved before the existing implementation began.

## Plan

1. Keep the amortization formula in a pure TypeScript utility so it can be
   tested independently of Nuxt and Vue.
2. Validate the numeric ranges before calculation and handle a zero monthly
   rate separately to avoid division by zero.
3. Keep principal and the calculated payment at cent precision; format the
   displayed amount as USD with two decimal places.
4. Share input and submission state between the form and report using Nuxt
   state, so results remain in sync across both components.
5. Test the three reference amounts and representative invalid values, then
   run the Nuxt type-check and production build.

## Decisions

- The annual nominal percentage is divided by 12 to get the monthly rate.
- The zero-rate payment is principal divided by the number of months.
- Principal is normalized to integer cents before applying the standard
  amortization formula. The resulting estimated payment is rounded to cents;
  no whole-dollar rounding is used.
- The simulator covers fixed-rate monthly payments and an affordability
  comparison only. It does not generate an amortization schedule, calculate
  lender-specific final installments, or report total interest.
- Inputs are limited to $1,000–$1,000,000 principal, 0–100% annual rate,
  1–360 whole months, and $500–$20,000 monthly income.
- The affordability indicator compares the estimated monthly payment with 30%
  of monthly income. It is an estimate, not a credit or lender decision.

## Verification Plan

- Verify $10,000 at 5% for 12 months → $856.07.
- Verify $10,000 at 0% for 12 months → $833.33.
- Verify $200,000 at 6% for 360 months → $1,199.10.
- Cross-check the reference payments independently of the TypeScript utility
  using the standard fixed-rate formula described by Microsoft's PMT
  documentation.
- Verify invalid values throw at the pure function boundary and the form
  prevents invalid submissions.
- Run `npm test`, `npm run typecheck`, and `npm run build` in the application
  directory.
