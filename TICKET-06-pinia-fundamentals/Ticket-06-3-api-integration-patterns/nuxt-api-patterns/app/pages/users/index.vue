<script setup lang="ts">
import { useUsersStore } from "~/stores/usersStore";

const store = useUsersStore();
onMounted(() => store.fetchUsers());
</script>
<template>
  <div>
    <span v-if="store.status === 'loading'">Loading Users ...</span>
    <span v-else-if="store.status === 'error'">Failed to Load Users... </span>
    <span v-else>
      <p v-for="user in store.users" :key="user.id">
        <span>
          <NuxtLink :to="`/users/${user.id}`">
            View {{ user.name }} Details</NuxtLink
          >
        </span>
        <br />
        <span for="name">Name: {{ user.name }}</span> <br />
        <span for="email">Email: {{ user.email }}</span>
      </p>
    </span>
  </div>
</template>
