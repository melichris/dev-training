import { mockTasks } from "~~/server/data/tasks";

export default defineEventHandler(() => {
  return mockTasks;
});
