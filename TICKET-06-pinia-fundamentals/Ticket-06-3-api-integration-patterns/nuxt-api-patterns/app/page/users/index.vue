<script setup lang="ts">
import { useUsersStore } from '~/stores/usersStore';

const store = useUsersStore()
onMounted(() => store.fetchUsers())
</script>
<template>
  <div>
    <span v-if="store.status === 'loading'">Loading Users ...</span>
    <span v-else-if="store.status === 'error'">Failed to Load Users... </span>
    <span v-else>
      <p v-for="user in store.users" :key="user.id">
        <NuxtLink :to="`/users/${user.id}`">{{ user.name }}</NuxtLink>
        <label for="name">Name: {{ user.name }}</label>
        <label for="email">Email: {{ user.email }}</label>
      </p>
    </span>
  </div>
</template>
