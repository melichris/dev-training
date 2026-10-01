<script setup lang="ts">
import { usePostStore } from '~/stores/postsStore';

const store = usePostStore()

onMounted(() => store.fetchPosts())
</script>
<template>
  <div>
    <span v-if="store.status === 'loading'">Loading Posts ...</span>
    <span v-else-if="store.status === 'error'">Failed to Load Posts... </span>
    <span class="all-posts" v-else>
      <p class="post" v-for="post in store.posts" :key="post.id">
      <h4>Title: {{ post.title }}</h4>
      <p for="body">Description: {{ post.body }}</p>

      <NuxtLink class="button-link" :to="`/posts/${post.id}`">Read More...</NuxtLink>
      </p>
    </span>
  </div>
</template>

<style>
.all-posts {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.post {
  background-color: aliceblue;
  padding: 20px;
  gap: 5px;
}

.button-link {
  padding: 5px 10px;
  border: 1px;
  border-radius: 8px;
  color: white;
  background-color: black;
  text-decoration: none;
}

.button-link:hover {
  background-color: white;
  color: black;
  transition: 0.3s;

}
</style>
