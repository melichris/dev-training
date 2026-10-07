import { mockTasks } from "~~/server/data/tasks";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"));
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1)
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  mockTasks.splice(index, 1);
  return { success: true };
});
