// server/api/books.ts
import type { Book } from "~/types/book";

const books: Book[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "finished",
    rating: 5,
    notes: "Must read for every developer",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "reading",
    rating: 4,
    notes: "Great principles",
  },
  {
    id: "3",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    status: "unread",
  },
];

export default defineEventHandler(() => {
  return books;
});
