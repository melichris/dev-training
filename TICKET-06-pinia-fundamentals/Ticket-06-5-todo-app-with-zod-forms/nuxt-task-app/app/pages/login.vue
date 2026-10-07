<script setup lang="ts">
import { useAuthStore } from "~/stores/authStore";
import { loginSchema } from "~~/shared/schemas/index";
import type { LoginForm } from "~~/shared/schemas/index";

const auth = useAuthStore();
const form = reactive<LoginForm>({ username: "", password: "" });
const errors = reactive({ username: "", password: "" });
const serverError = ref("");

const handleSubmit = async () => {
  errors.username = "";
  errors.password = "";
  serverError.value = "";
  const result = loginSchema.safeParse(form);
  if (!result.success) {
    result.error.issues.forEach((i) => {
      errors[i.path[0] as keyof typeof errors] = i.message;
    });
    return;
  }
  const error = await auth.login(form);
  if (error) {
    serverError.value = error;
    return;
  }
  navigateTo("/tasks");
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="form.username" placeholder="Username" />
    </div>
    <p v-if="errors.username" style="color: red">{{ errors.username }}</p>

    <div>
      <label for="password">Password</label>
      <input id="password" v-model="form.password" type="password" placeholder="Password" />
    </div>
    <p v-if="errors.password" style="color: red">{{ errors.password }}</p>
    <p v-if="serverError" style="color: red">{{ serverError }}</p>
    <button type="submit">Login</button>
  </form>
</template>
