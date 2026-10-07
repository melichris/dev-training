import { defineStore } from 'pinia'
import type { Book, NewBook, BookUpdate } from '~/types/book'

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([])

  function addBook(newBook: NewBook): void {
    books.value.push({
      ...newBook,
      id: crypto.randomUUID(),
    })
  }

  function updateBook(id: string, changes: BookUpdate): void {
    const index = books.value.findIndex(b => b.id === id)
    if (index !== -1) {
      books.value[index] = { ...books.value[index], ...changes } as Book
    }
  }

  function removeBook(id: string): void {
    books.value = books.value.filter(b => b.id !== id)
  }

  function getById(id: string): Book | undefined {
    return books.value.find(b => b.id === id)
  }

  const totalBooks = computed(() => books.value.length)
  const finishedBooks = computed(() =>
    books.value.filter(b => b.status === 'finished').length
  )
  const avgRating = computed(() => {
    const rated = books.value.filter(b => b.rating)
    if (!rated.length) return 0
    return rated.reduce((sum, b) => sum + (b.rating ?? 0), 0) / rated.length
  })

  return {
    books,
    addBook,
    updateBook,
    removeBook,
    getById,
    totalBooks,
    finishedBooks,
    avgRating,
  }
}, {
  persist: true,
})
