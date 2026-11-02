<template>
  <div v-if="!recipes.length" class="empty-state">
    No recipes available. Add one above to get started!
  </div>

  <div v-else v-for="recipe in recipes" :key="recipe.id">
    <RecipeItem :recipe="recipe" @delete-recipe="emit('delete-recipe', $event)" />
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/types'
import RecipeItem from './RecipeItem.vue'

defineProps<{
  recipes: Recipe[]
}>()

const emit = defineEmits<{
  'delete-recipe': [recipeId: number]
}>()
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 32px;
  color: #666;
  background-color: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin: 16px 0;
}
</style>
