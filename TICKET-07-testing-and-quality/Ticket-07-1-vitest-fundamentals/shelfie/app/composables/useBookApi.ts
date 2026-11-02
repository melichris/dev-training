import type { Book, NewBook, BookUpdate } from '~/types/book'

export function useBookApi() {
  async function getBooks(): Promise<Book[]> {
    return $fetch('/api/books')
  }

  async function getBook(id: string): Promise<Book> {
    return $fetch(`/api/books?query=${id}`)
  }

  async function createBook(book: NewBook): Promise<Book> {
    return $fetch('/api/books', { method: 'POST', body: book })
  }

  async function updateBook(id: string, changes: BookUpdate): Promise<Book> {
    return $fetch('/api/books', { method: 'PUT', query: { id }, body: changes })
  }

  async function deleteBook(id: string): Promise<{ success: boolean }> {
    return $fetch('/api/books', { method: 'DELETE', query: { id } })
  }

  return { getBooks, getBook, createBook, updateBook, deleteBook }
}
