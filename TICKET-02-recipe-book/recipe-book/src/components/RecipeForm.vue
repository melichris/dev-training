<template>
  <form @submit.prevent="handleSubmit">
    <label class="form-field">
      <span class="label-text">Recipe Name</span>
      <input v-model="form.name" placeholder="e.g. Tomato Pasta" />
    </label>

    <label class="form-field">
      <span class="label-text">Ingredients (comma-separated)</span>
      <input v-model="form.ingredients" placeholder="e.g. Tomatoes, Pasta, Garlic" />
    </label>

    <label class="checkbox-field">
      <input type="checkbox" v-model="form.isVegetarian" />
      <span>Vegetarian</span>
    </label>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <button type="submit">Add Recipe</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { NewRecipe } from '@/types/types'

const form = reactive({
  name: '',
  ingredients: '',
  isVegetarian: false,
})
const errorMessage = ref('')

const emit = defineEmits<{
  'add-recipe': [recipe: NewRecipe]
}>()

function handleSubmit() {
  const trimmedName = form.name.trim()

  const parsedIngredients = form.ingredients
    .split(',')
    .map((i) => i.trim())
    .filter((i) => i.length > 0)

  if (!trimmedName) {
    errorMessage.value = 'Recipe name is required.'
    return
  }

  if (parsedIngredients.length === 0) {
    errorMessage.value = 'At least one ingredient is required.'
    return
  }

  const newRecipe: NewRecipe = {
    name: trimmedName,
    ingredients: parsedIngredients,
    isVegetarian: form.isVegetarian,
  }

  emit('add-recipe', newRecipe)

  errorMessage.value = ''
  form.name = ''
  form.ingredients = ''
  form.isVegetarian = false
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 16px 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label-text {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

input[type='text'],
input:not([type]) {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.error {
  color: #dc3545;
  font-size: 14px;
  margin: 0;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
