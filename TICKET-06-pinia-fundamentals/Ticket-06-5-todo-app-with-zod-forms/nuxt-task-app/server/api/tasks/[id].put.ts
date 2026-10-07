import { mockTasks } from "~~/server/data/tasks";
import { taskSchema } from "~~/shared/schemas/index";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody(event);
  const result = taskSchema.partial().safeParse(body);
  if (!result.success) {
    throw createError({ statusCode: 400, data: result.error.issues });
  }
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1)
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  const task = mockTasks[index]!;
  mockTasks[index] = {
    id: task.id,
    title: result.data.title ?? task.title,
    description: result.data.description ?? task.description,
  };
  return mockTasks[index]!;
});
