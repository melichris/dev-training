<script lang="ts" setup>
import { reactive } from 'vue'
import { contactSchema } from '~~/shared/schemas/index'
import type { ContactForm } from '~~/shared/schemas/index'
const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
})
const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)
function handleSubmit() {
  // reset errors first
  errors.name = ''
  errors.email = ''
  errors.message = ''

  const result = contactSchema.safeParse(form)

  if (!result.success) {
    // loop through each failed field and assign its message
    result.error.issues.forEach((err) => {
      const field = err.path[0] as keyof typeof errors
      errors[field] = err.message
    })
    return
  }

  // if we reach here, all fields are valid
  submitted.value = true
}
</script>
<template>
  <form @submit.prevent="handleSubmit">

    <div>
      <label for="name">Name</label>
      <input id="name" v-model="form.name" placeholder="Your name" />
      <p v-if="errors.name" style="color: red;">{{ errors.name }}</p>
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="form.email" placeholder="Your email" />
      <p v-if="errors.email" style="color: red;">{{ errors.email }}</p>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea id="message" v-model="form.message" placeholder="Your message"></textarea>
      <p v-if="errors.message" style="color: red;">{{ errors.message }}</p>
    </div>

    <p v-if="submitted" style="color: green;">Message sent successfully!</p>

    <button type="submit">Send</button>

  </form>
</template>
