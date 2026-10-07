<script setup lang="ts">
import { taskSchema } from "~~/shared/schemas/index";

const props = defineProps<{
  task?: { id: number; title: string; description?: string };
}>();
const emit = defineEmits<{ submit: [title: string, description?: string] }>();

const form = reactive({
  title: props.task?.title ?? "",
  description: props.task?.description ?? "",
});
const errors = reactive({ title: "", description: "" });

const handleSubmit = () => {
  errors.title = "";
  errors.description = "";
  const result = taskSchema.safeParse(form);
  if (!result.success) {
    result.error.issues.forEach((i) => {
      const field = i.path[0] as keyof typeof errors;
      errors[field] = i.message;
    });
    return;
  }
  emit("submit", form.title, form.description);
  form.title = "";
  form.description = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.title" placeholder="Title" />
    <p v-if="errors.title" style="color: red">{{ errors.title }}</p>
    <input v-model="form.description" placeholder="Description (optional)" />
    <button type="submit">{{ task ? "Update" : "Create" }}</button>
  </form>
</template>
