<template>
  <main class="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">

    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 space-y-8">

      <div class="text-center space-y-2">
        <h1 class="text-3xl font-black text-slate-900 md:text-4xl tracking-tight">
          Loan Affordability Simulator
        </h1>
        <p class="text-slate-500 max-w-md mx-auto text-sm md:text-base">
          Calculate your monthly payments instantly and see if it crosses your safe spending threshold.
        </p>
      </div>

      <!-- The Grid layout displaying both of our components side-by-side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <LoanForm />
        <LoanReport />
      </div>

    </div>

  </main>
</template>
