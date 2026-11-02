<script setup lang="ts">
import { useApi } from "~/composables/useApi";
import type { User } from "~/types/api";

const route = useRoute();
const userId = route.params.id;

const status = ref<"loading" | "success" | "error">("loading");
const user = ref<User | null>(null);

onMounted(async () => {
  const { data, error } = await useApi<User>(`/api/users/${userId}`);
  if (error) {
    status.value = "error";
    return;
  }
  user.value = data;
  status.value = "success";
});
</script>

<template>
  <div>
    <span v-if="status === 'loading'">Loading user...</span>
    <span v-else-if="status === 'error'">User not found.</span>
    <div v-else>
      <p>Name: {{ user?.name }}</p>
      <p>Email: {{ user?.email }}</p>
    </div>
  </div>
</template>
