<!-- app/pages/books/new.vue -->
<script setup lang="ts">
import type { NewBook } from '~/types/book'


const { addBook } = useBookStore()

function handleSubmit(book: NewBook): void {
  addBook(book)
  navigateTo('/')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold">Add a Book</h1>
    <BookForm @submit="handleSubmit" @cancel="navigateTo('/')" />
  </div>
</template>
