<script setup lang="ts">

import { registerSchema } from "~~/shared/schemas/index";
import type { RegisterForm } from "~~/shared/schemas/index";

const form = reactive<RegisterForm>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const submitted = ref(false);
const serverError = ref("");


const handleSubmit = async () => {
  errors.username = "";
  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";

  const result = registerSchema.safeParse(form);

  if (!result.success) {
    result.error.issues.reduce((acc, issue) => {
      const field = issue.path[0] as keyof typeof errors;
      acc[field] = issue.message;
      return acc;
    }, errors);
    return;
  }

  // try {
  //   await $fetch("/api/register", {
  //     method: "POST",
  //     body: form,
  //   });
  //   submitted.value = true;
  // } catch (err: any) {
  //   serverError.value = err.data?.message || "Server error — please try again";
  // }
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form-card">
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" v-model="form.username" placeholder="Your username" />
      <p v-if="errors.username" class="error-text">{{ errors.username }}</p>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" placeholder="Your email" />
      <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" v-model="form.password" placeholder="Your password" />
      <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" type="password" v-model="form.confirmPassword" placeholder="Confirm your password" />
      <p v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</p>
    </div>

    <button type="submit">Register</button>

    <p v-if="serverError" class="error-text">{{ serverError }}</p>
  </form>
</template>

<style scoped>
.form-card {
  display: grid;
  gap: 1.25rem;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #1f2937;
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #dbe3f0;
  border-radius: 12px;
  background: #f8fafc;
  color: #0f172a;
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

button {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 25px rgba(79, 70, 229, 0.22);
}

.error-text {
  margin: 0;
  color: #dc2626;
  font-size: 0.9rem;
}
</style>
