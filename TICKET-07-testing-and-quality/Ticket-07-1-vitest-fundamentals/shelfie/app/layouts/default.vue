<!-- app/layouts/default.vue -->
<script setup lang="ts">
interface AppContext {
  appName: string
  version: string
}

const ctx: AppContext = {
  appName: 'Shelfie',
  version: '1.0.0',
}

provide('appContext', ctx)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <NuxtLink to="/" class="font-bold text-xl text-blue-600">📚 Shelfie</NuxtLink>
      <div class="flex gap-4 text-sm">
        <NuxtLink to="/" class="hover:text-blue-600">Books</NuxtLink>
        <NuxtLink to="/stats" class="hover:text-blue-600">Stats</NuxtLink>
        <NuxtLink to="/books/new" class="hover:text-blue-600">+ Add Book</NuxtLink>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
