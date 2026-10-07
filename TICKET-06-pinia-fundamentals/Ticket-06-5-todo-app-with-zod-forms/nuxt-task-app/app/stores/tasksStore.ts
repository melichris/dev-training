import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import type { Task } from "~~/shared/schemas/index";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    status: "idle" as "idle" | "loading" | "error",
  }),
  actions: {
    async fetchTasks() {
      this.status = "loading";
      const { data, error } = await useApi<Task[]>("/api/tasks");
      if (error) {
        this.status = "error";
        return;
      }
      this.tasks = data;
      this.status = "idle";
    },
    async createTask(title: string, description?: string) {
      const { data, error } = await useApi<Task>("/api/tasks", {
        method: "POST",
        body: { title, description },
      });
      if (!error) this.tasks.push(data!);
    },
    async updateTask(id: number, updates: Partial<Task>) {
      const { data, error } = await useApi<Task>(`/api/tasks/${id}`, {
        method: "PUT",
        body: updates,
      });
      if (!error) {
        const idx = this.tasks.findIndex((t) => t.id === id);
        if (idx > -1) this.tasks[idx] = data!;
      }
    },
    async deleteTask(id: number) {
      await useApi(`/api/tasks/${id}`, { method: "DELETE" });
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
});
