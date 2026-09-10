<script setup lang="ts">
const route = useRoute()
const postsId = route.params.id
const { data: posts, status } = await useFetch(`/api/post/${postsId}`)
</script>
<template>
  <div>
    <div v-if="status === 'pending'">Loading post...</div>
    <div v-else-if="!posts">Post not found.</div>
    <div v-else>
      <p>Title: {{ posts.title }}</p>
      <p>Body: {{ posts.body }}</p>
    </div>
  </div>
</template>
