# Nuxt Rendering Modes: Quick Summary

## 1) Server-Side Rendering (SSR) in Nuxt

SSR means the server creates the page HTML before it reaches the browser. This is useful when the page needs fresh data for every visit, like a dashboard, a user account page, or a product page with live stock.

Example:

```ts
// pages/profile.vue
<script setup lang="ts">
const { data } = await useFetch('/api/user')
</script>
```

What this means:

- The browser requests the page.
- The server fetches the user data.
- The page is rendered with that data and sent to the browser.

Pros:

- Good for SEO.
- Content is current on each request.
- Works well for personalised pages.

Cons:

- Slower than static pages.
- More load on the server.
- Needs server-side infrastructure.

## 2) Static Site Generation (SSG) in Nuxt

SSG means the page is built once during the build process and then served as a static file. It is best for content that does not change often, like a docs site, landing page, or portfolio.

Example:

```ts
// pages/about.vue
<script setup lang="ts">
const { data } = await useFetch('/api/about-content')
</script>
```

What this means:

- The content is fetched during build time.
- A static HTML file is generated.
- Visitors get a fast page without waiting for server-side rendering on every request.

Pros:

- Very fast loading.
- Cheap and easy to host.
- Great for mostly static content.

Cons:

- Content can go stale until a rebuild.
- Not ideal for live or user-specific data.
- Needs rebuilds when content changes.

## 3) Client-Side Rendering (CSR) in Nuxt

CSR means the browser loads the app shell first, then fetches and renders data in the browser using JavaScript. This is common for interactive app-like experiences.

Example:

```ts
// pages/dashboard.vue
<script setup lang="ts">
const filters = ref('all')
const { data, refresh } = await useFetch('/api/tasks')
</script>
```

What this means:

- The app loads.
- The browser fetches the tasks.
- The page updates after the user interacts with it.

Pros:

- Very interactive.
- Good for dashboards and filters.
- Feels app-like.

Cons:

- SEO is weaker.
- First load can be slower.
- More JavaScript runs in the browser.

## 4) Quick comparison

- SSR = build the page on the server when the user requests it
- SSG = build the page once, then reuse it
- CSR = send the app shell, then let the browser build the page

A simple way to remember it:

- SSR is for fresh data
- SSG is for speed and simplicity
- CSR is for interactive app experiences

## 5) Route-level control in Nuxt

Route-level control means you can decide how each page should render instead of applying one rule to the whole app. In Nuxt, this is usually done with `definePageMeta`.

Example: force SSR on one page

```ts
<script setup lang="ts">
definePageMeta({
  ssr: true
})
</script>
```

Example: force client-only rendering on one page

```ts
<script setup lang="ts">
definePageMeta({
  ssr: false
})
</script>
```

This is useful when one page needs live data while another page is static.

## 6) Practical summary

Use SSR when:

- the content changes often
- you need SEO
- the page depends on request-time data

Use SSG when:

- the page is mostly static
- speed matters
- you want cheap hosting

Use CSR when:

- the page is highly interactive
- it feels more like an app than a webpage
- data changes after the user interacts with it

Use route-level control when:

- different pages need different rendering rules
- one part of the app is static and another is dynamic

In short, Nuxt lets you choose the best approach for each page instead of forcing the same rendering mode across the whole app.
