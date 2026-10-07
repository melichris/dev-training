import { defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Book, NewBook, BookUpdate } from '~/types/book'

export const useBookStore = defineStore('book', () => {
  const { getBooks, createBook, updateBook: updateBookApi, deleteBook } = useBookApi()

  const books = ref<Book[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBooks(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      books.value = await getBooks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch books'
    } finally {
      loading.value = false
    }
  }

  async function addBook(newBook: NewBook): Promise<void> {
    try {
      const created = await createBook(newBook)
      books.value.push(created)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add book'
      throw err
    }
  }

  async function updateBook(id: string, changes: BookUpdate): Promise<void> {
    try {
      const updated = await updateBookApi(id, changes)
      const index = books.value.findIndex(b => b.id === id)
      if (index !== -1) {
        books.value[index] = updated
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update book'
      throw err
    }
  }

  async function removeBook(id: string): Promise<void> {
    try {
      await deleteBook(id)
      books.value = books.value.filter(b => b.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete book'
      throw err
    }
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
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    removeBook,
    getById,
    totalBooks,
    finishedBooks,
    avgRating,
  }
}, {
  persist: {
    key: 'shelfie:books',
  }
})
