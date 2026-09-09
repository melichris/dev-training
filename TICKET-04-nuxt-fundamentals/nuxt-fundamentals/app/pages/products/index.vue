<script setup lang="ts">
interface Product {
  title: string
  description: string
  price: number
  thumbnail: string
}

const { data: product, error } = await useFetch<Product>(`/api/products/`, {
  pick: ['title', 'description', 'price', 'thumbnail']
})
</script>
<template>
  <div>
    <div v-if="error">Failed to load product.{{ error.message }}</div>
    <div v-else-if="!product">Loading product...</div>
    <div v-else>
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <img :src="product.thumbnail" :alt="product.title" />
    </div>
  </div>
</template>
