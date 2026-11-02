<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/posts">Posts</NuxtLink>
      <NuxtLink to="/products">Product</NuxtLink>
    </nav>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
