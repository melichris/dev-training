<script setup lang="ts">
import type { Book } from '~~/types/book'

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'statusChange', id: string, status: Book['status']): void
}>()
</script>

<template>
  <div class="border rounded-xl p-4 flex flex-col gap-2 shadow-sm">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="font-semibold text-lg">{{ book.title }}</h2>
        <p class="text-sm text-gray-500">{{ book.author }}</p>
      </div>
      <StatusBadge :status="book.status" />
    </div>

    <RatingStars :rating="book.rating" :readonly="true" />

    <p v-if="book.notes" class="text-sm text-gray-600 italic">{{ book.notes }}</p>

    <!-- default slot: custom actions per use case -->
    <div class="mt-2 flex gap-2">
      <slot :book="book" />
    </div>

    <div class="flex gap-2 mt-1">
      <button v-if="book.status !== 'finished'" class="text-sm text-blue-600 hover:underline"
        @click="emit('statusChange', book.id, 'finished')">
        Mark as finished
      </button>
      <button class="text-sm text-red-500 hover:underline" @click="emit('remove', book.id)">
        Remove
      </button>
    </div>
  </div>
</template>
