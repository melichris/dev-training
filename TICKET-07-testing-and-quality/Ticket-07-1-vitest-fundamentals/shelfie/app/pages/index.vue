<script setup lang="ts">
import type { Book } from '~/types/book'

const { books, removeBook, updateBook } = useBookStore()

const { data, error, pending } = await useFetch<Book[]>('/api/books')

// Only seed store if it's empty (first load)
onMounted(() => {
  if (data.value && books.value.length === 0) books.value = data.value
})

const search = ref('')

const filteredBooks = computed(() =>
  books.value.filter(b =>
    b.title.toLowerCase().includes(search.value.toLowerCase()) ||
    b.author.toLowerCase().includes(search.value.toLowerCase())
  )
)

function handleRemove(id: string): void {
  removeBook(id)
}

function handleStatusChange(id: string, status: Book['status']): void {
  updateBook(id, { status })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">My Shelf</h1>
      <NuxtLink to="/books/new" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
        + Add Book
      </NuxtLink>
    </div>
    <input v-model="search" placeholder="Search by title or author..." class="border rounded px-3 py-2 text-sm w-full" />
    <p v-if="pending" class="text-gray-400 text-sm">Loading books...</p>
    <p v-else-if="error" class="text-red-500 text-sm">Failed to load books.</p>
    <p v-else-if="!filteredBooks.length" class="text-gray-400 text-sm">No books found. Add one!</p>
    <div v-else class="flex flex-col gap-4">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        @remove="handleRemove"
        @status-change="handleStatusChange"
      >
        <template #default="{ book: b }">
          <NuxtLink :to="`/books/${b.id}`" class="text-sm text-blue-600 hover:underline">
            View details
          </NuxtLink>
        </template>
      </BookCard>
    </div>
  </div>
</template>
