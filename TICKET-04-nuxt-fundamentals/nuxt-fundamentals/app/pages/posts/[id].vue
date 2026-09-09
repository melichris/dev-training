<script setup lang="ts">
const route = useRoute()
const postId = route.params.id
const { data: product, error } = await useFetch(`/api/products/${postId}`)
</script>
<template>
  <h1>Post {{ postId }}</h1>
  <p>{{ product.title }}</p>
  <p>{{ product.description }}</p>
</template>
