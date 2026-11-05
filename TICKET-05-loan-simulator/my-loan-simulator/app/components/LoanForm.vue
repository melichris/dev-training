<script setup lang="ts">
const {
  loanAmount,
  interestRate,
  loanTermMonths,
  monthlySalary,
  isFormValid,
  calculateLoan
} = useLoanMath()
</script>

<template>
  <form @submit.prevent="calculateLoan" class="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label for="loan-amount" class="block text-sm font-semibold text-gray-700">Amount to Borrow ($)</label>
        <span class="text-xs text-gray-400">$1,000–$1,000,000</span>
      </div>
      <input id="loan-amount" v-model.number="loanAmount" type="number" min="1000" max="1000000" step="0.01"
        required placeholder="e.g. 25000"
        class="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model.number="loanAmount" type="range" min="1000" max="1000000" step="1000"
        aria-label="Loan amount slider" class="w-full accent-blue-600" />
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label for="interest-rate" class="block text-sm font-semibold text-gray-700">Annual Interest Rate (%)</label>
        <span class="text-xs text-gray-400">0–100%</span>
      </div>
      <input id="interest-rate" v-model.number="interestRate" type="number" min="0" max="100" step="0.01"
        required placeholder="e.g. 5"
        class="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label for="loan-term" class="block text-sm font-semibold text-gray-700">Loan Term (months)</label>
        <span class="text-xs text-gray-400">1–360 months</span>
      </div>
      <input id="loan-term" v-model.number="loanTermMonths" type="number" min="1" max="360" step="1"
        required placeholder="e.g. 60"
        class="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label for="monthly-income" class="block text-sm font-semibold text-gray-700">Your Monthly Income ($)</label>
        <span class="text-xs text-gray-400">$500–$20,000</span>
      </div>
      <input id="monthly-income" v-model.number="monthlySalary" type="number" min="500" max="20000" step="0.01"
        required placeholder="e.g. 5000"
        class="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model.number="monthlySalary" type="range" min="500" max="20000" step="100"
        aria-label="Monthly income slider" class="w-full accent-blue-600" />
    </div>

    <button type="submit" :disabled="!isFormValid"
      :class="[!isFormValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100']"
      class="w-full py-3 px-4 rounded-xl font-bold transition duration-200">
      Calculate Monthly Payment
    </button>
  </form>
</template>
