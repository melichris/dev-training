<template>
  <div class="totals-display" aria-label="Expense Summary">
    <div class="stat-card">
      <span class="stat-label">Total Amount</span>
      <span class="stat-value font-mono">${{ props.totalAmount.toFixed(2) }}</span>
    </div>

    <div class="stat-card" :class="{ 'has-unpaid': props.unpaidCount > 0 }">
      <span class="stat-label">Unpaid Bills</span>
      <span class="stat-value">{{ props.unpaidCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalAmount: number
  unpaidCount: number
}>()
</script>

<style scoped>
.totals-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
}

.font-mono {
  font-family: monospace;
  letter-spacing: -0.02em;
}

/* Dynamic visual warning when unpaid balances exist */
.stat-card.has-unpaid {
  border-color: #fed7d7;
  background-color: #fff5f5;
}

.stat-card.has-unpaid .stat-label {
  color: #e53e3e;
}

.stat-card.has-unpaid .stat-value {
  color: #9b2c2c;
}
</style>
