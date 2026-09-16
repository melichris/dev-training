<template>
  <div class="expense-list">
    <div v-if="props.expenses.length === 0" class="empty-state">
      No expenses to display.
    </div>

    <div v-else class="list-container">
      <ExpenseRow v-for="expense in props.expenses" :key="expense.id" :expense="expense"
        @toggle-paid="emit('toggle-paid', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '@/types/types'
import ExpenseRow from './ExpenseRow.vue'

const props = defineProps<{
  expenses: Expense[]
}>()

const emit = defineEmits<{
  'toggle-paid': [payload: number]
}>()
</script>

<style scoped>
.expense-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 24px;
  color: #666;
  background-color: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 6px;
  font-size: 14px;
}
</style>
