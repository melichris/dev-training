import { z } from "zod";
export interface Task {
  id: number;
  title: string;
  description?: string;
}

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type TaskForm = z.infer<typeof taskSchema>;
