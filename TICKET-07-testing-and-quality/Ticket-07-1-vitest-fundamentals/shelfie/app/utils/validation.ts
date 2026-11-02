import { z } from "zod";
import type { NewBook } from "~/types/book";

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .min(2, "Author must be at least 2 characters"),
  status: z.enum(["unread", "reading", "finished"]),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
});

export function validateBook(data: unknown): {
  success: boolean;
  data?: NewBook;
  errors?: Record<string, string>;
} {
  try {
    const validated = bookSchema.parse(data);
    return { success: true, data: validated };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      err.issues.forEach((error) => {
        const field = error.path.join(".");
        errors[field] = error.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { form: "Validation failed" } };
  }
}
