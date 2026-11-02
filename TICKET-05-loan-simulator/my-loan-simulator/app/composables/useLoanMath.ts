import { ref, computed } from "vue";

export const useLoanMath = () => {
  // 1. Reactive Inputs (State)
  // We initialize everything as null so inputs show placeholders instead of 0.
  const loanAmount = ref<number | null>(null);
  const interestRate = ref<number | null>(null);
  const loanTermMonths = ref<number | null>(null);
  const monthlySalary = ref<number | null>(null);

  // 2. Operational State
  const hasSubmitted = ref(false);
  const monthlyPayment = ref(0);
  const isAffordable = ref(false);

  // 3. Form Validation (Computed Property)
  // This automatically tracks changes. It returns TRUE only if all inputs are filled and greater than 0.
  const isFormValid = computed(() => {
    return (
      (loanAmount.value ?? 0) > 0 &&
      (interestRate.value ?? 0) > 0 &&
      (loanTermMonths.value ?? 0) > 0 &&
      (monthlySalary.value ?? 0) > 0
    );
  });

  // 4. The Action Function
  // This executes standard loan amortization math when called.
  const calculateLoan = () => {
    if (!isFormValid.value) return; // Safety guard

    const principal = loanAmount.value!;
    const monthlyRate = interestRate.value! / 100 / 12;
    const numberOfPayments = loanTermMonths.value!;

    // Standard mortgage/loan amortization formula
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Save the rounded payment amount
    monthlyPayment.value = Math.round(payment);

    // Apply the 30% rule: payment shouldn't exceed 30% of their salary
    const safeLimit = monthlySalary.value! * 0.3;
    isAffordable.value = monthlyPayment.value <= safeLimit;

    // Flip this switch to trigger the report visibility in the UI
    hasSubmitted.value = true;
  };

  // 5. Expose everything to the components
  return {
    loanAmount,
    interestRate,
    loanTermMonths,
    monthlySalary,
    hasSubmitted,
    monthlyPayment,
    isAffordable,
    isFormValid,
    calculateLoan,
  };
};
