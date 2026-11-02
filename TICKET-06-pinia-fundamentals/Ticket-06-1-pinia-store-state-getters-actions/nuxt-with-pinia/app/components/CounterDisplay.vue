<template>
  <p>Count: {{ counter.count }}</p>
  <p>Double count : {{ counter.doubleCount }}</p>
</template>
<script setup>
const counter = useCounterStore()
</script>
