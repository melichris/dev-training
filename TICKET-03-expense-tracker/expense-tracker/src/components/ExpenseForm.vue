<template>
  <div class="expense-form">
    <form @submit.prevent="submitForm">
      <label class="form-field">
        <span class="label-text">Description</span>
        <input v-model="form.description" type="text" placeholder="e.g., Grocery Shopping" />
      </label>

      <div class="form-row">
        <label class="form-field">
          <span class="label-text">Amount</span>
          <input v-model="form.amount" type="number" step="0.01" min="0.01" placeholder="0.00" />
        </label>

        <label class="form-field">
          <span class="label-text">Category</span>
          <select v-model="category">
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
        </label>
      </div>

      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>

      <button type="submit" class="submit-btn">Add Expense</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { NewExpense, Category } from '@/types/types'
import { reactive, ref } from 'vue'

const form = reactive({
  description: '',
  amount: '',
})

const category = ref<Category>('food')
const errorMessage = ref('')

const emit = defineEmits<{
  'add-expense': [payload: NewExpense]
}>()

function validate(): boolean {
  if (!form.description.trim()) {
    errorMessage.value = 'Description is required.'
    return false
  }

  const parsedAmount = Number(form.amount.trim())
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    errorMessage.value = 'Amount must be a positive number.'
    return false
  }

  errorMessage.value = ''
  return true
}

function submitForm() {
  if (!validate()) return

  const newExpense: NewExpense = {
    description: form.description.trim(),
    amount: parseFloat(form.amount),
    date: new Date().toISOString(),
    category: category.value,
    paid: false,
  }

  emit('add-expense', newExpense)

  form.description = ''
  form.amount = ''
  category.value = 'food'
}
</script>

<style scoped>
.expense-form {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label-text {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}

input[type="text"],
input[type="number"],
select {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  background-color: #fff;
  color: #1a202c;
  transition: border-color 0.15s ease;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
}

.error {
  color: #e53e3e;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

.submit-btn {
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background-color: #3182ce;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.submit-btn:hover {
  background-color: #2b6cb0;
}

.submit-btn:active {
  background-color: #2c5282;
}
</style>
