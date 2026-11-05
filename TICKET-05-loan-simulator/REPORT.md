# Loan Simulator Remediation Report

**Date:** 2026-11-04

**Ticket:** `TICKET-05-loan-simulator`

**Review Reference:** `QA-REVIEW-2026-09-28.md`

**Status:** Code findings addressed; reviewer sign-off pending

## 1. Findings Addressed

| Finding | Status | Evidence |
|---|---|---|
| Empty ticket, approach, and report artifacts | ✅ Documented | Filled `TICKET.md`, `APPROACH.md`, and this report with the actual scope, decisions, and verification. The ticket and approach explicitly identify themselves as retrospective. |
| 0% interest rejected and formula divides by zero | ✅ Fixed | The form allows a 0% annual rate; the pure calculator uses principal divided by term when the monthly rate is zero. A unit test confirms $10,000 over 12 months yields $833.33. |
| Monthly payment rounded to whole dollars | ✅ Fixed | Calculation rounds to cents, and the report formats the result as USD with two decimal places. Unit tests cover $856.07 and $1,199.10 reference payments. |
| Rate and term not editable in the simulator | ✅ Fixed | Added annual-rate and term controls with ranges matching the calculator's validation. |
| Form and report held separate composable state | ✅ Fixed | The composable now shares inputs with Nuxt state so the report reads the submitted values and recalculates when valid values change. |

The application remains an affordability estimator; it does not calculate
total interest or a lender-specific final installment. That limitation is
explicitly documented in the ticket and application README.

## 2. Calculation Evidence

The pure calculation utility was tested against the review's standard
fixed-rate reference values:

| Principal | Annual rate | Term | Expected monthly payment | Result |
|---:|---:|---:|---:|---|
| $10,000.00 | 5% | 12 months | $856.07 | ✅ Pass |
| $10,000.00 | 0% | 12 months | $833.33 | ✅ Pass |
| $200,000.00 | 6% | 360 months | $1,199.10 | ✅ Pass |

The same reference values were independently recalculated with a separate
Python implementation of the formula. Its rate and payment-count convention
matches [Microsoft's PMT documentation](https://support.microsoft.com/en-us/excel/functions/pmt-function).

Additional tests verify that zero/invalid principal, rates outside 0–100%,
invalid terms, and non-finite numeric values throw a `RangeError`.

## 3. Verification

From `TICKET-05-loan-simulator/my-loan-simulator/`:

```text
$ npm test
✓ test/loanMath.test.ts (10 tests)
Test Files  1 passed (1)
Tests       10 passed (10)

$ npm run typecheck
> nuxt typecheck
Completed with exit code 0

$ npm run build
Nuxt 4.5.2
✔ Client built
✔ Server built
✔ Nuxt Nitro server built
Build complete!
```

`git diff --check` completed without whitespace errors.

Dependency installation reported 29 audit advisories (3 low, 12 moderate,
9 high, 5 critical). Dependency remediation was not part of this ticket and
was not attempted.

## 4. Documentation Preservation and Sign-Off

No dated QA review or prior dated report was edited. The previously empty,
undated `TICKET.md`, `APPROACH.md`, and `REPORT.md` now document the work.
Reviewer sign-off remains pending before closing the ticket.