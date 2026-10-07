<script setup lang="ts">
const { totalBooks, finishedBooks, readingBooks, unreadBooks, avgRating, readingProgress } = useReadingStats()
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-bold">Reading Stats</h1>

    <!-- stats grid -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div class="bg-white p-4 rounded-lg border shadow-sm">
        <p class="text-sm text-gray-500">Total Books</p>
        <p class="text-3xl font-bold">{{ totalBooks }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg border shadow-sm">
        <p class="text-sm text-gray-500">Finished</p>
        <p class="text-3xl font-bold text-green-600">{{ finishedBooks }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg border shadow-sm">
        <p class="text-sm text-gray-500">Reading</p>
        <p class="text-3xl font-bold text-blue-600">{{ readingBooks }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg border shadow-sm">
        <p class="text-sm text-gray-500">Unread</p>
        <p class="text-3xl font-bold text-gray-600">{{ unreadBooks }}</p>
      </div>
    </div>

    <!-- progress bar -->
    <div class="bg-white p-6 rounded-lg border shadow-sm">
      <p class="text-sm text-gray-500 mb-2">Reading Progress</p>
      <div class="flex items-center gap-4">
        <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            :style="{ width: `${readingProgress}%` }"
            class="bg-green-500 h-full transition-all"
          />
        </div>
        <span class="text-lg font-semibold">{{ readingProgress }}%</span>
      </div>
    </div>

    <!-- average rating -->
    <div class="bg-white p-6 rounded-lg border shadow-sm">
      <p class="text-sm text-gray-500 mb-2">Average Rating</p>
      <div class="flex items-center gap-2">
        <p class="text-4xl font-bold">{{ avgRating.toFixed(1) }}</p>
        <p class="text-2xl">{{ avgRating > 0 ? '★' : '—' }}</p>
      </div>
    </div>

    <!-- back to books -->
    <NuxtLink to="/" class="text-blue-600 hover:underline text-sm">
      ← Back to Books
    </NuxtLink>
  </div>
</template>
