<template>
  <div class="expense-row" :class="{ 'is-paid': props.expense.paid }">
    <span class="description">{{ props.expense.description }}</span>
    <span class="amount">{{ currencySymbol }}{{ props.expense.amount.toFixed(2) }}</span>
    <span class="category-badge">{{ props.expense.category }}</span>
    <span class="date">{{ props.expense.date }}</span>
    <span class="status" :class="props.expense.paid ? 'paid' : 'unpaid'">
      {{ props.expense.paid ? 'Paid' : 'Unpaid' }}
    </span>
    <button class="action-btn" @click="emit('toggle-paid', props.expense.id)">
      {{ props.expense.paid ? 'Mark as Unpaid' : 'Mark as Paid' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '@/types/types'
import { inject } from 'vue'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  'toggle-paid': [payload: number]
}>()

const currencySymbol = inject<string>('currencySymbol', '$')
</script>

<style scoped>
.expense-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Subtle background shade for paid rows */
.expense-row.is-paid {
  background-color: #f8f9fa;
  border-color: #e2e8f0;
}

.description {
  font-weight: 500;
  color: #1a202c;
}

.amount {
  font-family: monospace;
  font-size: 15px;
  font-weight: 600;
  color: #2d3748;
}

.category-badge {
  font-size: 12px;
  padding: 4px 8px;
  background-color: #edf2f7;
  color: #4a5568;
  border-radius: 4px;
  width: fit-content;
}

.status {
  font-size: 13px;
  font-weight: 600;
}

.status.paid {
  color: #2f855a;
}

.status.unpaid {
  color: #c53030;
}

.action-btn {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #cbd5e0;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.action-btn:hover {
  background-color: #f7fafc;
  border-color: #a0aec0;
}

/* Red-themed toggle button state if already paid */
.is-paid .action-btn:hover {
  color: #c53030;
  border-color: #feb2b2;
  background-color: #fff5f5;
}
</style>
