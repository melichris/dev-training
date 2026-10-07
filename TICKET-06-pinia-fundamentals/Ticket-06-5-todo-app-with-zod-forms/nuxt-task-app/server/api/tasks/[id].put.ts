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
  mockTasks[index] = {
    ...mockTasks[index],
    ...result.data,
    id: mockTasks[index].id,
  };
  return mockTasks[index];
});
