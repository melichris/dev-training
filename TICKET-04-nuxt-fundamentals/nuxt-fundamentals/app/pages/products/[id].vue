<script setup lang="ts">
const route = useRoute()
const productId = route.params.id
const { data: product, status } = await useFetch(`/api/products/${productId}`)
</script>
<template>
  <div>
    <div v-if="status === 'pending'">Loading product...</div>
    <div v-else-if="!product">Product not found.</div>
    <div v-else>
      <p>Name: {{ product.title }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
    </div>
  </div>
</template>
