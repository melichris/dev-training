# Nuxt 3 Routing: Core Concepts & Practical Scenarios

This guide summarizes the essential routing mechanics in Nuxt 3, detailing how they work with practical code examples and real-world deployment scenarios.

---

## 1. Pages

Nuxt features a **file-based routing system**. Every Vue component inside the `pages/` directory automatically maps to a public URL route based on its filename and directory nesting.

### Code Example

```vue
<!-- pages/index.vue -->
<!-- Maps to: / -->
<template>
  <div>
    <h1>Welcome to the Homepage</h1>
  </div>
</template>

<!-- pages/blog/index.vue -->
<!-- Maps to: /blog -->
<template>
  <div>
    <h1>Blog Archive</h1>
  </div>
</template>
```

### Ideal Scenario

- **Marketing & Informational Sites:** Perfect for applications with rigid, predictable hierarchies (e.g., `/`, `/about`, `/contact`, `/pricing`).
- **E-Commerce Directories:** Organizes content logically by separating category roots from deep item configurations.

---

## 2. Navigation

To move between routes without triggering full browser reloads, Nuxt provides the built-in `<NuxtLink>` component. It acts as an enhanced version of the HTML `<a>` tag, featuring background **route prefetching** for near-instant page transitions.

### Code Example

```vue
<!-- components/Navbar.vue -->
<template>
  <nav>
    <!-- Basic internal linking -->
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/blog">Blog</NuxtLink>

    <!-- External linking (automatically adds rel attributes) -->
    <NuxtLink to="https://nuxt.com" target="_blank">Nuxt Docs</NuxtLink>
  </nav>
</template>
```

### Ideal Scenario

- **Global Navigation Bars & Footers:** Ensures core public pages load smoothly without jank.
- **SEO-Critical Internal Linking:** Optimizes crawler indexing by exposing native anchor links while preserving SPA performance for users.

---

## 3. Route Parameters

Dynamic path segments are declared using square brackets (`[param]`). These runtime values are captured and parsed automatically via the `useRoute()` composable.

### Code Example

```vue
<!-- pages/blog/[slug].vue -->
<!-- Maps to: /blog/my-first-post, /blog/hello-world -->
<script setup>
const route = useRoute();
const postSlug = route.params.slug; // Captured from the URL
</script>

<template>
  <div>
    <h1>Viewing Post: {{ postSlug }}</h1>
  </div>
</template>
```

### Ideal Scenario

- **Dynamic CMS Content:** Displaying content dynamically fetched from an external API based on unique identifiers (e.g., `/blog/[slug]` or `/users/[id]`).
- **Multi-tenant Interfaces:** Serving distinct workspace environments or dashboards mapped to a unique workspace slug (e.g., `/workspace/[teamId]`).

---

## 4. Route Middleware

Route middleware allows you to intercept and run code **before navigating to a page**. It is commonly used for security overrides, logging, and redirect logic. Middleware can be defined inline or globally inside the `middleware/` folder.

### Code Example

```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth(); // Custom composable tracking token state

  // Redirect unauthenticated users trying to access protected paths
  if (!isAuthenticated.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
```

```vue
<!-- pages/dashboard.vue -->
<script setup>
definePageMeta({
  middleware: "auth", // Attaches the auth middleware
});
</script>

<template>
  <div>
    <h1>Secure Dashboard</h1>
  </div>
</template>
```

### Ideal Scenario

- **Authentication Guards:** Protecting account, profile, or enterprise pages from unauthorized visitor access.
- **A/B Testing or Feature Toggles:** Dynamically redirecting active traffic variants based on feature flags or browser language preferences before rendering begins.

---

## 5. Route Validation

Nuxt lets you validate incoming route arguments before executing runtime fetching. The `validate` property inside `definePageMeta` accepts a function that returns a boolean or a redirect object. If it returns `false`, Nuxt automatically throws a `404 Not Found` error.

### Code Example

```vue
<!-- pages/products/[id].vue -->
<script setup>
definePageMeta({
  validate: async (route) => {
    // Check if the route parameter 'id' consists strictly of numeric digits
    return /^\d+$/.test(route.params.id)
  }
})
```

<template>
  <div>
    <h1>Product Details (ID: {{ $route.params.id }})</h1>
  </div>
</template>
```

### Ideal Scenario

- **Strict ID Verification:** Preventing malformed network requests by validating that primary database keys are purely numeric (e.g., reject `/products/abc` while allowing `/products/4921`).
- **Fixed Enumerations:** Confirming that a dynamic path matches a strict whitelist, such as locale paths (e.g., only validating `/lang/[code]` if code is matching `en`, `es`, or `fr`).
