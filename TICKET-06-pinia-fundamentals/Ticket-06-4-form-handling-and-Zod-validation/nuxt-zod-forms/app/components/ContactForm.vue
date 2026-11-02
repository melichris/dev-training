<script setup lang="ts">
import { reactive, ref } from "vue";
import { contactSchema } from "~~/shared/schemas/index";
import type { ContactForm } from "~~/shared/schemas/index";
const form = reactive<ContactForm>({
  name: "",
  email: "",
  message: "",
});
const errors = reactive({
  name: "",
  email: "",
  message: "",
});
const submitted = ref(false);
const serverError = ref("");

async function handleSubmit() {
  errors.name = "";
  errors.email = "";
  errors.message = "";
  serverError.value = "";

  const result = contactSchema.safeParse(form);

  if (!result.success) {
    result.error.issues.forEach((err) => {
      const field = err.path[0] as keyof typeof errors;
      errors[field] = err.message;
    });
    return;
  }

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: form,
    });
    submitted.value = true;
  } catch (err: any) {
    serverError.value = err.data?.message || "Server error — please try again";
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form-card">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" placeholder="Your name" />
      <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" placeholder="Your email" />
      <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        placeholder="Your message"
      ></textarea>
      <p v-if="errors.message" class="error-text">{{ errors.message }}</p>
    </div>

    <p v-if="submitted" class="success-text">Message sent successfully!</p>

    <button type="submit">Send</button>

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

input,
textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #dbe3f0;
  border-radius: 12px;
  background: #f8fafc;
  color: #0f172a;
  font: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

textarea {
  min-height: 140px;
  resize: vertical;
}

button {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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

.success-text {
  margin: 0;
  color: #15803d;
  font-weight: 600;
}
</style>
