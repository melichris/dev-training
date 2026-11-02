<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
}
const { data: posts, status, error } = await useFetch<Post[]>('/api/post')
</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading posts...</div>
    <div v-else-if="error">Failed to load posts.{{ error.message }}</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
