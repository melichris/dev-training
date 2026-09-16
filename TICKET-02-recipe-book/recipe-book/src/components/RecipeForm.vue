<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Recipe name" />
    <input v-model="form.ingredients" placeholder="Ingredients (comma-separated)" />
    <label> <input type="checkbox" v-model="form.isVegetarian" /> Vegetarian </label>
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
