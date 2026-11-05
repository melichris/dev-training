<script setup lang="ts">
const counter = useCounterStore()
const themeStore = useThemeStore()
</script>

<template>
  <main class="mx-auto max-w-2xl space-y-6 p-8">
    <h1 class="text-2xl font-bold">Pinia Store: State, Getters, and Actions</h1>
    <p>Count: {{ counter.count }}</p>
    <p>Doubled: {{ counter.doubleCount }}</p>
    <p>Step: {{ counter.step }}</p>
    <p>Projected count (count + step): {{ counter.projectedCount }}</p>
    <div class="flex flex-wrap gap-2">
    <button class="rounded border px-3 py-1" @click="counter.increment()">Increment by 1</button>
    <button class="rounded border px-3 py-1" @click="counter.incrementBy(5)">Increment by 5</button>
    <button class="rounded border px-3 py-1" @click="counter.incrementByStep()">Increment by step</button>
    <button class="rounded border px-3 py-1" @click="counter.$reset()">Reset counter</button>
    </div>

    <section class="space-y-2 rounded border p-4">
    <h2 class="font-semibold">Same store in another component</h2>
    <p>Change the counter above and this component updates without props or emits.</p>
    <CounterDisplay />
    </section>

    <section class="space-y-2 rounded border p-4">
    <CounterReactivityDemo />
    </section>

    <section class="space-y-2 rounded border p-4">
    <h2 class="font-semibold">Independent theme store</h2>
    <p>Theme: {{ themeStore.themeLabel }}</p>
    <button class="rounded border px-3 py-1" @click="themeStore.toggleTheme()">
      Toggle theme
    </button>
    </section>
  </main>
</template>
