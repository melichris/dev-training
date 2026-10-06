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
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="form.username" placeholder="Your username" />
      <p v-if="errors.username" style="color: red;">{{ errors.username }}</p>
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="form.email" placeholder="Your email" />
      <p v-if="errors.email" style="color: red;">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="form.password" placeholder="Your password" />
      <p v-if="errors.password" style="color: red;">{{ errors.password }}</p>
    </div>

    <div>
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" type="password" v-model="form.confirmPassword" placeholder="Confirm your password" />
      <p v-if="errors.confirmPassword" style="color: red;">{{ errors.confirmPassword }}</p>
    </div>

    <button type="submit">Register</button>

    <p v-if="serverError" style="color: red;">{{ serverError }}</p>
  </form>
</template>
