<script setup lang="ts">
const message = ref('')

const loadMessage = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  message.value = 'Message loaded!'
}
</script>

<template>
  <div>
    <button @click="loadMessage">Load</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
