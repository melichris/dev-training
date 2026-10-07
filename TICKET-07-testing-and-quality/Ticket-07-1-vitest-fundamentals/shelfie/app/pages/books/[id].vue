<!-- app/pages/books/[id].vue -->
<script setup lang="ts">
import type { BookUpdate } from '~/types/book'


const route = useRoute()
const id = route.params.id as string

const { getById, updateBook, removeBook } = useBookStore()

const book = computed(() => getById(id))

// log view on mount — lifecycle hook with side effect
onMounted(() => {
  if (book.value) {
    console.log(`Viewing: ${book.value.title}`)
  }
})

const isEditing = ref(false)

const editForm = reactive<BookUpdate>({
  title: '',
  author: '',
  status: 'unread',
  rating: undefined,
  notes: '',
})

// sync editForm when editing starts
watch(isEditing, (val) => {
  if (val && book.value) {
    Object.assign(editForm, book.value)
  }
})

function handleUpdate(): void {
  updateBook(id, { ...editForm })
  isEditing.value = false
}

function handleRemove(): void {
  removeBook(id)
  navigateTo('/')
}
</script>

<template>
  <div v-if="book" class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ book.title }}</h1>
      <div class="flex gap-2">
        <button class="text-sm text-blue-600 hover:underline" @click="isEditing = !isEditing">
          {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>
        <button class="text-sm text-red-500 hover:underline" @click="handleRemove">
          Remove
        </button>
      </div>
    </div>

    <!-- view mode -->
    <div v-if="!isEditing" class="flex flex-col gap-3">
      <p class="text-gray-500">{{ book.author }}</p>
      <StatusBadge :status="book.status" />
      <RatingStars :rating="book.rating" :readonly="true" />
      <p v-if="book.notes" class="text-sm text-gray-600 italic">
        {{ book.notes }}
      </p>
    </div>

    <!-- edit mode -->
    <div v-else class="flex flex-col gap-3">
      <input v-model="editForm.title" class="border rounded px-3 py-2 text-sm" placeholder="Title" />
      <input v-model="editForm.author" class="border rounded px-3 py-2 text-sm" placeholder="Author" />
      <select v-model="editForm.status" class="border rounded px-3 py-2 text-sm">
        <option value="unread">Unread</option>
        <option value="reading">Reading</option>
        <option value="finished">Finished</option>
      </select>
      <RatingStars v-model:rating="editForm.rating" />
      <textarea v-model="editForm.notes" class="border rounded px-3 py-2 text-sm" placeholder="Notes" />
      <button class="bg-blue-600 text-white px-4 py-2 rounded text-sm self-start" @click="handleUpdate">
        Save Changes
      </button>
    </div>
  </div>

  <!-- book not found -->
  <div v-else class="text-gray-400 text-sm">
    Book not found. <NuxtLink to="/" class="text-blue-600">Go back</NuxtLink>
  </div>
</template>
