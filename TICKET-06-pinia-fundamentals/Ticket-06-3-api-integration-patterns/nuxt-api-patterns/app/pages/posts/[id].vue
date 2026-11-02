<script setup lang="ts">
import { useApi } from "~/composables/useApi";
import type { Post } from "~/types/api";

const route = useRoute();
const postId = route.params.id;

const status = ref<"loading" | "success" | "error">("loading");
const post = ref<Post | null>(null);

onMounted(async () => {
  const { data, error } = await useApi<Post>(`/api/posts/${postId}`);
  if (error) {
    status.value = "error";
    return;
  }
  post.value = data;
  status.value = "success";
});
</script>
<template>
  <div>
    <span v-if="status === 'loading'">Loading post...</span>
    <span v-else-if="status === 'error'">Post not found.</span>
    <div v-else>
      <p>Title: {{ post?.title }}</p>
      <p>Description: {{ post?.body }}</p>
    </div>
  </div>
</template>
