<script setup lang="ts">
import type { Book } from '~/types/book'

const store = useBookStore()
const { books, loading, error, addBook, updateBook, removeBook } = store

// Fetch on mount instead of useFetch
onMounted(async () => {
  if (books.length === 0) {
    await store.fetchBooks()
  }
})

const search = ref('')

const filteredBooks = computed(() =>
  books.filter(b =>
    b.title.toLowerCase().includes(search.value.toLowerCase()) ||
    b.author.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function handleRemove(id: string): Promise<void> {
  await removeBook(id)
}

async function handleStatusChange(id: string, status: Book['status']): Promise<void> {
  await updateBook(id, { status })
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
    <p v-if="loading" class="text-gray-400 text-sm">Loading books...</p>
    <p v-else-if="error" class="text-red-500 text-sm">{{ error }}</p>
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
