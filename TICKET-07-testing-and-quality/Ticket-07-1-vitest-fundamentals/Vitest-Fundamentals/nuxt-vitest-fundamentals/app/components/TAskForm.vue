<script setup lang="ts">
import { taskSchema } from '~~/shared/schemas/index'

const emit = defineEmits<{ submit: [title: string, description?: string] }>()

const form = reactive({ title: '', description: '' })
const errors = reactive({ title: '', description: '' })

const handleSubmit = () => {
  errors.title = ''
  errors.description = ''

  const result = taskSchema.safeParse(form)

  if (!result.success) {
    result.error.issues.forEach(i => {
      const field = i.path[0] as keyof typeof errors
      errors[field] = i.message
    })
    return
  }

  emit('submit', form.title, form.description)
  form.title = ''
  form.description = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="title">Title</label>
    <input id="title" v-model="form.title" placeholder="Title" />
    <p v-if="errors.title">{{ errors.title }}</p>
    <label for="description">Description</label>
    <input id="description" v-model="form.description" placeholder="Description (optional)" />
    <button type="submit">{{ $props }}</button>
  </form>
</template>
