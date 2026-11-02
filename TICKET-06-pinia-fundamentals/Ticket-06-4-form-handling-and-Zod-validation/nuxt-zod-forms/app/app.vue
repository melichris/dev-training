<template>
  <div class="app-shell">
    <nav class="main-nav">
      <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      <NuxtLink to="/register" class="nav-link">Register</NuxtLink>
    </nav>

    <main class="page-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #f4f7ff 0%, #eef6ff 100%);
  color: #1f2937;
  font-family: "Segoe UI", sans-serif;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.25rem 1rem 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  color: #374151;
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.12);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff;
}

.page-content {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem 3rem;
}
</style>
