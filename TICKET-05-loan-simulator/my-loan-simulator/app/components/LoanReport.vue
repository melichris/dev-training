<script setup>
const { hasSubmitted, monthlyPayment, isAffordable } = useLoanMath()
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-6 border border-dashed border-gray-200 rounded-xl min-h-[350px]">

    <!-- Empty State (Shown before submission) -->
    <div v-if="!hasSubmitted" class="text-center space-y-2">
      <div class="text-4xl">📊</div>
      <h3 class="text-lg font-bold text-gray-800">No Simulation Data</h3>
      <p class="text-sm text-gray-500 max-w-xs mx-auto">
        Adjust the sliders on the left and hit calculate to check your affordability rating.
      </p>
    </div>

    <!-- Active State (Shown after submission) -->
    <div v-else class="w-full text-center space-y-6">
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Estimated Monthly Payment</h3>
        <p class="text-5xl font-black text-gray-900 mt-2">${{ monthlyPayment }}</p>
      </div>

      <!-- Conditional Verdict Banner -->
      <div
        :class="[isAffordable ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800']"
        class="p-4 rounded-xl border text-sm font-medium leading-relaxed">
        <p v-if="isAffordable">
          🎉 <strong>Approved!</strong> This fits perfectly within the safe 30% debt-to-income threshold framework based
          on your monthly income.
        </p>
        <p v-else>
          ⚠️ <strong>Over Limit!</strong> This payment exceeds 30% of your total monthly salary. We recommend extending
          your loan term or borrowing less.
        </p>
      </div>
    </div>

  </div>
</template>
