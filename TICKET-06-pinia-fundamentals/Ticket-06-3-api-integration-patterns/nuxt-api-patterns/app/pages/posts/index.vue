<script setup lang="ts">
import { usePostStore } from '~/stores/postsStore';

const store = usePostStore()

onMounted(() => store.fetchPosts())
</script>
<template>
  <div>
    <span v-if="store.status === 'loading'">Loading Posts ...</span>
    <span v-else-if="store.status === 'error'">Failed to Load Posts... </span>
    <span v-else>
      <p v-for="post in store.posts" :key="post.id">
        <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
        <label for="title">Title: {{ post.title }}</label>
        <label for="body">Description: {{ post.body }}</label>
      </p>
    </span>
  </div>
</template>
