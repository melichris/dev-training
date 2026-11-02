<script setup lang="ts">
import { useAuthStore } from "~/stores/authStore";
import { useTasksStore } from "~/stores/tasksStore";

definePageMeta({ middleware: "auth" });

const tasks = useTasksStore();
const auth = useAuthStore();
const editingTask = ref<{
  id: number;
  title: string;
  description?: string;
} | null>(null);

onMounted(() => tasks.fetchTasks());

const handleCreate = (title: string, description?: string) =>
  tasks.createTask(title, description);
const handleUpdate = (title: string, description?: string) => {
  if (editingTask.value) {
    tasks.updateTask(editingTask.value.id, { title, description });
    editingTask.value = null;
  }
};
const handleLogout = () => {
  auth.logout();
  navigateTo("/login");
};
</script>

<template>
  <div>
    <button @click="handleLogout">Logout</button>
    <p>Welcome, {{ auth.user?.username }}</p>

    <h2>Create Task</h2>
    <TaskForm @submit="handleCreate" />

    <h2>Tasks</h2>
    <p v-if="tasks.status === 'loading'">Loading...</p>
    <p v-else-if="tasks.status === 'error'">Failed to load tasks.</p>
    <div v-else v-for="task in tasks.tasks" :key="task.id">
      <p>{{ task.title }} — {{ task.description }}</p>
      <button @click="editingTask = task">Edit</button>
      <button @click="tasks.deleteTask(task.id)">Delete</button>
    </div>

    <div v-if="editingTask">
      <h2>Edit Task</h2>
      <TaskForm :task="editingTask" @submit="handleUpdate" />
    </div>
  </div>
</template>
s
