<script setup lang="ts">

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

const { data: prodList, error } = await useFetch<Product[]>(`/api/products/`);
</script>
<template>
  <div>
    <div v-if="error">Failed to load product.{{ error.message }}</div>
    <div v-else-if="!prodList">Loading product...</div>
    <div v-else>
      <div v-for="product in prodList" :key="product.id">
        <ul>
          <li>
            <NuxtLink :to="`/products/${product.id}`">
              Product Title: {{ product.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
