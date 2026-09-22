<template>
  <div v-if="status === 'loading'" class="loading-state">Loading expenses...</div>
  <div v-else-if="status === 'error'" class="error-state">Failed to load expenses.</div>

  <div v-else-if="status === 'success'" class="dashboard-layout">
    <TotalsDisplay :totalAmount="totalAmount" :unpaidCount="unpaidCount" />

    <div class="filters">
      <button :class="{ active: activeCategory === 'all' }" :aria-pressed="activeCategory === 'all'"
        @click="activeCategory = 'all'">
        All
      </button>
      <button :class="{ active: activeCategory === 'food' }" :aria-pressed="activeCategory === 'food'"
        @click="activeCategory = 'food'">
        Food
      </button>
      <button :class="{ active: activeCategory === 'transport' }" :aria-pressed="activeCategory === 'transport'"
        @click="activeCategory = 'transport'">
        Transport
      </button>
      <button :class="{ active: activeCategory === 'bills' }" :aria-pressed="activeCategory === 'bills'"
        @click="activeCategory = 'bills'">
        Bills
      </button>
      <button :class="{ active: activeCategory === 'bills' }" :aria-pressed="activeCategory === 'bills'"
        @click="activeCategory = 'wife'">
        Wife
      </button>
      <button :class="{ active: activeCategory === 'others' }" :aria-pressed="activeCategory === 'others'"
        @click="activeCategory = 'others'">
        Others
      </button>
    </div>

    <ExpenseForm @add-expense="handleAddExpense" />

    <ExpenseList :expenses="filteredExpenses" @toggle-paid="handleTogglePaid" />
  </div>
</template>

<script setup lang="ts">
import TotalsDisplay from './TotalsDisplay.vue'
import ExpenseForm from './ExpenseForm.vue'
import ExpenseList from './ExpenseList.vue'
import { useExpenses } from '@/composables/useExpenses'

const {
  status,
  activeCategory,
  filteredExpenses,
  totalAmount,
  unpaidCount,
  handleAddExpense,
  handleTogglePaid,
} = useExpenses()
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #4a5568;
}

.error-state {
  color: #c53030;
  font-weight: 500;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.filters button {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  background-color: #edf2f7;
  border: 1px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filters button:hover {
  background-color: #e2e8f0;
  color: #1a202c;
}

/* Active configuration state styling */
.filters button.active {
  background-color: #3182ce;
  color: #fff;
  box-shadow: 0 2px 4px rgba(49, 130, 206, 0.2);
}

.filters button:focus-visible {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
}
</style>
