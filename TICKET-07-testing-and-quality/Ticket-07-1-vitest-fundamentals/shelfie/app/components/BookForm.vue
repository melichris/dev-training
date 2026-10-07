<!-- app/components/BookForm.vue -->
<script setup lang="ts">
import type { NewBook } from '~~/types/book'
import { useLocalDraft } from '~/composables/useLocalDraft'

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

// load saved draft on mount
onMounted(() => {
  const draft = loadDraft()
  if (draft) Object.assign(form, draft)
})

// autosave draft on every change
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
  if (!form.title || !form.author) return
  emit('submit', { ...form })
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

    <input v-model="form.title" placeholder="Title" class="border rounded px-3 py-2 text-sm" />
    <input v-model="form.author" placeholder="Author" class="border rounded px-3 py-2 text-sm" />

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
