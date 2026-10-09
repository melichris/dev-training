<script setup lang="ts">
import type { NewBook } from '~/types/book'
import { validateBook } from '~/utils/validation'

const emit = defineEmits<{
  (e: 'submit', book: NewBook): void
  (e: 'cancel'): void
}>()

const { saveDraft, loadDraft, clearDraft } = useLocalDraft()

const form = reactive<NewBook>({
  title: '',
  author: '',
  status: 'unread',
  rating: undefined,
  notes: '',
})

const errors = reactive<Record<string, string>>({})

onMounted(() => {
  const draft = loadDraft()
  if (draft) Object.assign(form, draft)
})

watch(
  () => ({ ...form }),
  (newVal) => saveDraft(newVal),
  { deep: true }
)

const completion = computed(() => {
  const fields = [form.title, form.author, form.status, form.rating, form.notes]
  return Math.round((fields.filter(Boolean).length / fields.length) * 100)
})

function handleSubmit(): void {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  const validation = validateBook(form)
  if (!validation.success) {
    Object.assign(errors, validation.errors)
    return
  }

  emit('submit', validation.data!)
  Object.assign(form, { title: '', author: '', status: 'unread', rating: undefined, notes: '' })
  clearDraft()
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 border rounded-xl">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-lg">Add a Book</h2>
      <span class="text-sm text-gray-400">{{ completion }}% complete</span>
    </div>

    <div class="flex flex-col gap-1">
      <input v-model="form.title" placeholder="Title" class="border rounded px-3 py-2 text-sm"
        :class="{ 'border-red-500': errors.title }" />
      <p v-if="errors.title" class="text-red-500 text-xs">{{ errors.title }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <input v-model="form.author" placeholder="Author" class="border rounded px-3 py-2 text-sm"
        :class="{ 'border-red-500': errors.author }" />
      <p v-if="errors.author" class="text-red-500 text-xs">{{ errors.author }}</p>
    </div>

    <select v-model="form.status" class="border rounded px-3 py-2 text-sm">
      <option value="unread">Unread</option>
      <option value="reading">Reading</option>
      <option value="finished">Finished</option>
    </select>

    <RatingStars v-model:rating="form.rating" />

    <textarea v-model="form.notes" placeholder="Notes (optional)" class="border rounded px-3 py-2 text-sm" />

    <div class="flex gap-2">
      <button class="bg-blue-600 text-white px-4 py-2 rounded text-sm" @click="handleSubmit">
        Add Book
      </button>
      <button class="text-gray-500 px-4 py-2 text-sm" @click="emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>
