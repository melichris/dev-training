<script setup lang="ts">
interface Product {
  title: string
  description: string
  price: number
  thumbnail: string
}

const route = useRoute()
const productId = route.params.id

const { data: product, error } = await useFetch<Product>(`https://dummyjson.com/products/${productId}`, {
  pick: ['title', 'description', 'price', 'thumbnail']
})
</script>

<template>
  <div v-if="error">
    <h1>Error loading product</h1>
    <p>{{ error.message }}</p>
  </div>

  <div v-else-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.thumbnail" :alt="product.title" />
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
  </div>

  <div v-else>
    <h1>Loading product...</h1>
  </div>
</template>
