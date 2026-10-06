<script setup lang="ts">
</script>

<template>
  <section class="page-panel">
    <div class="page-header">
      <p class="eyebrow">Contact</p>
      <h1>Send us a message</h1>
    </div>

    <ContactForm />
  </section>
</template>

<style scoped>
.page-panel {
  width: min(100%, 680px);
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.page-header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4f46e5;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #0f172a;
}
</style>
