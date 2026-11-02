<script setup>
// Nuxt automatically imports useLoanMath from the composables folder!
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
  <!-- @submit.prevent prevents the page from refreshing when clicking the button -->
  <form @submit.prevent="calculateLoan" class="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">

    <!-- Input 1: Loan Amount -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label class="block text-sm font-semibold text-gray-700">Amount to Borrow ($)</label>
        <span class="text-xs text-gray-400">Min: $1K | Max: $100K</span>
      </div>
      <!-- Text Input (Shows placeholder text when loanAmount is null) -->
      <input v-model.number="loanAmount" type="number" placeholder="e.g. 25000"
        class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <!-- Slider Input (Bound to the exact same variable) -->
      <input v-model.number="loanAmount" type="range" min="1000" max="100000" step="500"
        class="w-full accent-blue-600" />
    </div>

    <!-- Input 2: Monthly Salary -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label class="block text-sm font-semibold text-gray-700">Your Monthly Income ($)</label>
        <span class="text-xs text-gray-400">Min: $500 | Max: $20K</span>
      </div>
      <input v-model.number="monthlySalary" type="number" placeholder="e.g. 5000"
        class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model.number="monthlySalary" type="range" min="500" max="20000" step="100"
        class="w-full accent-blue-600" />
    </div>

    <!-- Submit Button -->
    <!-- :disabled hooks directly into our validation rule -->
    <button type="submit" :disabled="!isFormValid"
      :class="[!isFormValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100']"
      class="w-full py-3 px-4 rounded-xl font-bold transition duration-200">
      Simulate Affordability
    </button>
  </form>
</template>
