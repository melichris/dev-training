import type { Book, NewBook, BookUpdate } from '~/types/book'
import { createError, defineEventHandler, getQuery, readBody } from 'h3'

let books: Book[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    status: 'finished',
    rating: 5,
    notes: 'Must read for every developer',
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'reading',
    rating: 4,
    notes: 'Great principles',
  },
  {
    id: '3',
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    status: 'unread',
  },
]

export default defineEventHandler(async (event) => {
  const requestedId = getQuery(event).id
  const id = typeof requestedId === 'string' ? requestedId : undefined

  // GET all or single
  if (event.method === 'GET') {
    if (!id) return books
    const book = books.find((item) => item.id === id)
    if (!book) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    return book
  }

  // POST create
  if (event.method === 'POST') {
    const body = await readBody<NewBook>(event)
    if (!body.title || !body.author) {
      throw createError({ statusCode: 400, statusMessage: 'Title and author required' })
    }
    const newBook: Book = { ...body, id: crypto.randomUUID() }
    books.push(newBook)
    return newBook
  }

  // PUT update
  if (event.method === 'PUT') {
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Book id required' })
    const body = await readBody<BookUpdate>(event)
    const idx = books.findIndex(b => b.id === id)
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    const existing = books[idx]
    if (!existing) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    const updated: Book = { ...existing, ...body, id: existing.id }
    books[idx] = updated
    return updated
  }

  // DELETE
  if (event.method === 'DELETE') {
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Book id required' })
    books = books.filter(b => b.id !== id)
    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
