import type { Book, NewBook, BookUpdate } from '~/types/book'

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
  const { query } = getQuery(event)
  const id = query as string

  // GET all or single
  if (event.node.req.method === 'GET') {
    return id ? books.find(b => b.id === id) : books
  }

  // POST create
  if (event.node.req.method === 'POST') {
    const body = await readBody<NewBook>(event)
    if (!body.title || !body.author) {
      throw createError({ statusCode: 400, statusMessage: 'Title and author required' })
    }
    const newBook: Book = { ...body, id: crypto.randomUUID() }
    books.push(newBook)
    return newBook
  }

  // PUT update
  if (event.node.req.method === 'PUT') {
    const body = await readBody<BookUpdate>(event)
    const idx = books.findIndex(b => b.id === id)
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    books[idx] = { ...books[idx], ...body }
    return books[idx]
  }

  // DELETE
  if (event.node.req.method === 'DELETE') {
    books = books.filter(b => b.id !== id)
    return { success: true }
  }
})
