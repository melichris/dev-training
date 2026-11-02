<script setup lang="ts">
const props = defineProps<{
  rating?: number
  max?: number
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:rating', value: number): void
}>()

const max = computed(() => props.max ?? 5)

const stars = computed(() =>
  Array.from({ length: max.value }, (_, i) => ({
    index: i + 1,
    filled: i < (props.rating ?? 0),
  }))
)

function selectRating(value: number) {
  if (!props.readonly) emit('update:rating', value)
}
</script>

<template>
  <div class="flex gap-1">
    <button v-for="star in stars" :key="star.index"
      :class="['text-xl', star.filled ? 'text-yellow-400' : 'text-gray-300']" :disabled="readonly"
      @click="selectRating(star.index)">
      ★
    </button>
  </div>
</template>
