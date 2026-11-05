<template>
  <p>Count: {{ counter.count }}</p>
  <p>Double count : {{ counter.doubleCount }}</p>
</template>
<script setup lang="ts">
const counter = useCounterStore()
</script>
