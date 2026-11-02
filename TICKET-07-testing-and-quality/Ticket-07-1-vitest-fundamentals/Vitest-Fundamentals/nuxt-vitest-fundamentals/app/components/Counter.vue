<script setup lang="ts">
const count = ref(0)
const emit = defineEmits<{ increment: [count: number] }>()

const handleClick = () => {
  count.value++
  emit('increment', count.value)
}
</script>

<template>
  <button @click="handleClick">Count: {{ count }}</button>
</template>
