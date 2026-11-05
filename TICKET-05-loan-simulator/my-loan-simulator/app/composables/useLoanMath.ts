import { computed } from 'vue'
import { calculateMonthlyPayment } from '~/utils/loanMath'

export const useLoanMath = () => {
  const loanAmount = useState<number | null>('loan-amount', () => null)
  const interestRate = useState<number | null>('loan-interest-rate', () => null)
  const loanTermMonths = useState<number | null>('loan-term-months', () => null)
  const monthlySalary = useState<number | null>('loan-monthly-salary', () => null)
  const hasSubmitted = useState('loan-has-submitted', () => false)

  const isFormValid = computed(() => {
    const principal = loanAmount.value
    const annualRate = interestRate.value
    const termMonths = loanTermMonths.value
    const salary = monthlySalary.value

    return (
      typeof principal === 'number' &&
      Number.isFinite(principal) &&
      principal >= 1_000 &&
      principal <= 1_000_000 &&
      typeof annualRate === 'number' &&
      Number.isFinite(annualRate) &&
      annualRate >= 0 &&
      annualRate <= 100 &&
      typeof termMonths === 'number' &&
      Number.isInteger(termMonths) &&
      termMonths >= 1 &&
      termMonths <= 360 &&
      typeof salary === 'number' &&
      Number.isFinite(salary) &&
      salary >= 500 &&
      salary <= 20_000
    )
  })

  const monthlyPayment = computed(() => {
    const principal = loanAmount.value
    const annualRate = interestRate.value
    const termMonths = loanTermMonths.value
    if (
      !isFormValid.value ||
      principal === null ||
      annualRate === null ||
      termMonths === null
    ) {
      return 0
    }

    return calculateMonthlyPayment(principal, annualRate, termMonths)
  })

  const isAffordable = computed(
    () => monthlyPayment.value <= (monthlySalary.value ?? 0) * 0.3,
  )
  const showReport = computed(() => hasSubmitted.value && isFormValid.value)

  const calculateLoan = () => {
    if (isFormValid.value) hasSubmitted.value = true
  }

  return {
    loanAmount,
    interestRate,
    loanTermMonths,
    monthlySalary,
    hasSubmitted: showReport,
    monthlyPayment,
    isAffordable,
    isFormValid,
    calculateLoan,
  }
}
