import { mockTasks } from "~~/server/data/tasks";
import { taskSchema } from "~~/shared/schemas/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = taskSchema.safeParse(body);
  if (!result.success) {
    throw createError({ statusCode: 400, data: result.error.issues });
  }
  const newTask = { id: Date.now(), ...result.data };
  mockTasks.push(newTask);
  return newTask;
});
