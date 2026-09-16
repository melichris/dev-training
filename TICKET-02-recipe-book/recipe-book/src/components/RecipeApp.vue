<template>
  <div v-if="status === 'loading'" class="">Loading recipes...</div>
  <div v-else-if="status === 'error'">Failed to load recipes.</div>

  <div v-else-if="status === 'success'">
    <StatsDisplay :totalCount="totalCount" :vegetarianCount="vegetarianCount" />

    <div class="sort-controls">
      <button
        :class="{ active: sortBy === 'name' }"
        :aria-pressed="sortBy === 'name'"
        @click="sortBy = 'name'"
      >
        Sort by Name
      </button>
      <button
        :class="{ active: sortBy === 'createdAt' }"
        :aria-pressed="sortBy === 'createdAt'"
        @click="sortBy = 'createdAt'"
      >
        Sort by Date
      </button>
      <button
        :class="{ active: sortBy === 'vegetarian' }"
        :aria-pressed="sortBy === 'vegetarian'"
        @click="sortBy = 'vegetarian'"
      >
        Sort by Vegetarian
      </button>
    </div>

    <RecipeForm @add-recipe="handleAddRecipe" />

    <RecipeList :recipes="sortedRecipes" @delete-recipe="handleDeleteRecipe" />
  </div>
</template>

<script setup lang="ts">
import RecipeForm from './RecipeForm.vue'
import RecipeList from './RecipeList.vue'
import StatsDisplay from './StatsDisplay.vue'
import { useRecipes } from '@/composables/useRecipes'

const {
  status,
  sortBy,
  sortedRecipes,
  vegetarianCount,
  totalCount,
  handleAddRecipe,
  handleDeleteRecipe,
} = useRecipes()
</script>

<style scoped>
.sort-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.sort-controls button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.sort-controls button.active {
  background-color: #c0b62a;
  color: white;
  border-color: #c0b62a;
  font-weight: bold;
}
</style>
