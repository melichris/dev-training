const MIN_PRINCIPAL_CENTS = 100_000
const MAX_PRINCIPAL_CENTS = 100_000_000
const MAX_ANNUAL_RATE = 100
const MAX_TERM_MONTHS = 360
const CENTS_PER_DOLLAR = 100

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  if (!Number.isFinite(principal)) {
    throw new RangeError('Principal must be a finite number.')
  }
  if (!Number.isFinite(annualRate)) {
    throw new RangeError('Annual interest rate must be a finite number.')
  }
  if (!Number.isInteger(termMonths)) {
    throw new RangeError('Loan term must be a whole number of months.')
  }

  const principalCents = Math.round(principal * CENTS_PER_DOLLAR)
  if (principalCents < MIN_PRINCIPAL_CENTS || principalCents > MAX_PRINCIPAL_CENTS) {
    throw new RangeError('Principal must be between $1,000 and $1,000,000.')
  }
  if (annualRate < 0 || annualRate > MAX_ANNUAL_RATE) {
    throw new RangeError('Annual interest rate must be between 0% and 100%.')
  }
  if (termMonths < 1 || termMonths > MAX_TERM_MONTHS) {
    throw new RangeError('Loan term must be between 1 and 360 months.')
  }

  const monthlyRate = annualRate / 100 / 12
  const exactPaymentCents =
    monthlyRate === 0
      ? principalCents / termMonths
      : (principalCents * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths)

  return Math.round(exactPaymentCents) / CENTS_PER_DOLLAR
}
