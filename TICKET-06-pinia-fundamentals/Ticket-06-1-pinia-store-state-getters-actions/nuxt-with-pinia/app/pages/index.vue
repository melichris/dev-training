<script setup lang="ts">
const counter = useCounterStore()
const themeStore = useThemeStore()
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Doubled: {{ counter.doubleCount }}</p>
    <p>Step: {{ counter.step }}</p>
    <p>IncrementByStep: {{ counter.projectedCount }}</p>
    <button @click="counter.increment()">Increment</button>
    <button @click="counter.incrementByStep()">incrementByStep</button>
    <hr>
    <p>From another components</p>
    <CounterDisplay />
    <hr>
    <p>State with storeToRefs() and $reset()</p>
    <CounterDistructure />
    <button @click="counter.$reset">reset</button>
    <!-- <hr> -->
    <!-- <p>Theme: {{ themeStore.themeLabel }}</p> -->
    <!-- <button @click="themeStore.toggleTheme">Toggle Theme</button> -->
  </div>
</template>
