<script setup lang="ts">
import type { Book } from '~~/types/book'

const props = defineProps<{
  status: Book['status']
}>()

const statusMap: Record<Book['status'], { label: string; color: string }> = {
  unread: { label: 'Unread', color: 'bg-gray-200 text-gray-700' },
  reading: { label: 'Reading', color: 'bg-blue-200 text-blue-700' },
  finished: { label: 'Finished', color: 'bg-green-200 text-green-700' },
}

const badge = computed(() => statusMap[props.status])
</script>

<template>
  <span :class="['px-2 py-1 rounded-full text-sm font-medium', badge.color]">
    {{ badge.label }}
  </span>
</template>
