export interface Book {
  id: string;
  title: string;
  author: string;
  status: "unread" | "reading" | "finished";
  rating?: number;
  notes?: string;
}

export type NewBook = Omit<Book, "id">;
export type BookUpdate = Partial<Book>;
