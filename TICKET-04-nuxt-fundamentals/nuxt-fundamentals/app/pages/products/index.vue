<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

const { data: prodList, status, error } = await useFetch<Product[]>('/api/products', {
  lazy: true,
})
</script>
<template>
  <div>
    <div v-if="status === 'pending'">Loading products...</div>
    <div v-else-if="error">Failed to load products. {{ error.message }}</div>
    <div v-else>
      <p v-if="!prodList?.length">No products found.</p>
      <ul v-else>
        <li v-for="product in prodList" :key="product.id">
          <NuxtLink :to="`/products/${product.id}`">
            Product Title: {{ product.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
