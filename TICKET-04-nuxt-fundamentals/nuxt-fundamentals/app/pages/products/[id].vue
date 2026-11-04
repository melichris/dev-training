<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

const route = useRoute()
const productId = computed(() => route.params.id)
const { data: product, status, error } = await useFetch<Product>(
  () => `/api/products/${productId.value}`,
  { lazy: true },
)

if (import.meta.server && error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? 'Unable to load product',
    fatal: true,
  })
}
</script>
<template>
  <div>
    <div v-if="status === 'pending'">Loading product...</div>
    <div v-else-if="error">Failed to load product. {{ error.message }}</div>
    <div v-else-if="!product">Product not found.</div>
    <div v-else>
      <p>Name: {{ product.title }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
    </div>
  </div>
</template>
