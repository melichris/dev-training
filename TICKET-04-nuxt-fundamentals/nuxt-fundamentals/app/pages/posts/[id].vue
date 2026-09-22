<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
}

const route = useRoute()
const postsId = route.params.id

const { data: post, status, error } = await useFetch<Post>(`/api/post/${postsId}`, {
  lazy: true,
})
</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading post...</div>
    <div v-else-if="error">Failed to load post. {{ error.message }}</div>
    <div v-else-if="!post">Post not found.</div>
    <div v-else>
      <p>Title: {{ post.title }}</p>
      <p>Body: {{ post.body }}</p>
    </div>
  </div>
</template>
