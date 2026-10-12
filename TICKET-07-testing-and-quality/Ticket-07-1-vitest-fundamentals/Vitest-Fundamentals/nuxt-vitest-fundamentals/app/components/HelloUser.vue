<script setup lang="ts">
defineProps<{ name: string, show?: boolean }>()
const visible = ref(true)
</script>

<template>
  <div>
    <p v-if="show">Hello, {{ name }}!</p>
    <button @click="visible = !visible">Toggle</button>
    <span v-if="visible">Visible</span>
  </div>
</template>
