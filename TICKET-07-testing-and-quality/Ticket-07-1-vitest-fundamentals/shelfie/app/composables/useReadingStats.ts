import { computed } from 'vue'
import { useBookStore } from '~/stores/book'

export function useReadingStats() {
  const { books } = useBookStore()

  const totalBooks = computed(() => books.length)

  const finishedBooks = computed(() =>
    books.filter(b => b.status === 'finished').length
  )

  const readingBooks = computed(() =>
    books.filter(b => b.status === 'reading').length
  )

  const unreadBooks = computed(() =>
    books.filter(b => b.status === 'unread').length
  )

  const avgRating = computed(() => {
    const rated = books.filter(b => b.rating)
    if (!rated.length) return 0
    return rated.reduce((sum, b) => sum + (b.rating ?? 0), 0) / rated.length
  })

  const readingProgress = computed(() => {
    if (!totalBooks.value) return 0
    return Math.round((finishedBooks.value / totalBooks.value) * 100)
  })

  return {
    totalBooks,
    finishedBooks,
    readingBooks,
    unreadBooks,
    avgRating,
    readingProgress,
  }
}
