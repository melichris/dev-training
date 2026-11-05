<script setup lang="ts">
import { storeToRefs } from 'pinia'

const counter = useCounterStore()
const { count: detachedCount } = counter
const { count, doubleCount } = storeToRefs(counter)
</script>

<template>
  <section class="space-y-2">
    <h2 class="font-semibold">Destructuring and reactivity</h2>
    <p>Direct destructuring snapshot (stays at initial value): {{ detachedCount }}</p>
    <p>Reactive count from storeToRefs: {{ count }}</p>
    <p>Reactive getter from storeToRefs: {{ doubleCount }}</p>
  </section>
</template>
