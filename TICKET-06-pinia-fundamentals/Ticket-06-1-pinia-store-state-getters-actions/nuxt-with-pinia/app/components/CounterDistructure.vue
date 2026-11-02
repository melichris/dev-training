<template>
  <p>Count: {{ count }}</p>
</template>
<script setup>
const { count } = storeToRefs(useCounterStore())
// const { count } = useCounterStore()
</script>
