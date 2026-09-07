# Nuxt 3 Layouts Architecture

Nuxt provides a robust layout system to share common UI structures across multiple pages (e.g., headers, footers, sidebars). Layouts are stored in the `layouts/` directory and are automatically loaded via code-splitting to keep your bundles light.

---

## 1. Default Layout

### What it is

The base master page that Nuxt automatically applies to all pages unless specified otherwise. It relies on the `<slot />` component, which acts as a placeholder for your page content.

### Example File Structure

```text
├── layouts/
│   └── default.vue
└── pages/
    └── index.vue
```

### Code Example

```vue
<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-blue-600 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <span class="font-bold">My App</span>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
    </header>

    <main class="flex-grow container mx-auto p-4">
      <!-- The current page content will inject here -->
      <slot />
    </main>

    <footer class="bg-gray-800 text-white text-center p-4">
      &copy; 2026 My Nuxt App
    </footer>
  </div>
</template>
```

### Scenario

**Global Framework:** Use this when 90% of your application shares the exact same header, global alert banner, navigation menu, and footer layout.

---

## 2. Custom Layouts

### What it is

Alternative layout blueprints created for specific sections of your website that require a unique structure. You explicitly assign these layouts to pages using `definePageMeta`.

### Example File Structure

```text
├── layouts/
│   └── admin.vue
└── pages/
    └── dashboard/
        └── index.vue
```

### Code Example

```vue
<!-- layouts/admin.vue -->
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-gray-900 text-white p-6">
      <h2 class="text-xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li><NuxtLink to="/dashboard">Overview</NuxtLink></li>
        <li><NuxtLink to="/dashboard/settings">Settings</NuxtLink></li>
      </ul>
    </aside>

    <!-- Main Workspace -->
    <div class="flex-1 bg-gray-100">
      <header class="bg-white shadow p-4">Welcome back, Admin</header>
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
```

```vue
<!-- pages/dashboard/index.vue -->
<script setup>
definePageMeta({
  layout: "admin", // Tells Nuxt to look for layouts/admin.vue instead of default.vue
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Dashboard Overview</h1>
    <p>Real-time analytics widgets go here.</p>
  </div>
</template>
```

### Scenario

**Segmented Dashboards:** Use this when a user logs into a backend admin console or client portal that discards the consumer-facing marketing header in favor of a collapsible vertical dashboard sidebar.

---

## 3. Dynamic Layout Switching

### What it is

Changing a page’s layout design dynamically at runtime based on app state, user interactions, or conditions (like subscription levels). This bypasses `definePageMeta` in favor of template-level mapping or the `setPageLayout()` helper.

### Code Example

```vue
<!-- pages/profile.vue -->
<script setup>
definePageMeta({
  layout: false, // Disables automatic layout injection entirely for this page
});

const isPremiumUser = ref(false);

function toggleTheme() {
  isPremiumUser.value = !isPremiumUser.value;
}
</script>

<template>
  <div>
    <!-- Wrap elements inside the NuxtLayout component -->
    <NuxtLayout :name="isPremiumUser ? 'premium-gold' : 'default'">
      <div class="p-6 bg-white rounded shadow">
        <h1 class="text-xl">User Profile</h1>
        <button
          @click="toggleTheme"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Premium Preview
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>
```

### Scenario

**Paywalled / Tiered Interfaces:** Use this when an anonymous landing page needs to seamlessly adapt its theme/layout frames instantly to gold, sleek luxury skins if an upgraded tier user logs in, without forcing hard route redirects.
