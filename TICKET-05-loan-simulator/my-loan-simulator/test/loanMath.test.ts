import { describe, expect, it } from 'vitest'
import { calculateMonthlyPayment } from '../app/utils/loanMath'

describe('calculateMonthlyPayment', () => {
  it.each([
    [10_000, 5, 12, 856.07],
    [10_000, 0, 12, 833.33],
    [200_000, 6, 360, 1_199.10],
  ])(
    'calculates $%s at %s%% over %s months as $%s',
    (principal, annualRate, termMonths, expected) => {
      expect(calculateMonthlyPayment(principal, annualRate, termMonths)).toBe(expected)
    },
  )

  it.each([
    [0, 5, 12],
    [10_000, -0.01, 12],
    [10_000, 100.01, 12],
    [10_000, 5, 0],
    [10_000, 5, 12.5],
    [Number.NaN, 5, 12],
    [10_000, Number.POSITIVE_INFINITY, 12],
  ])('rejects invalid inputs (%s, %s, %s)', (principal, annualRate, termMonths) => {
    expect(() => calculateMonthlyPayment(principal, annualRate, termMonths)).toThrow(
      RangeError,
    )
  })
})
