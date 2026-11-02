# Nuxt 4 Data Fetching

Data fetching is basically how we get data into a page before or while it is being shown. In Nuxt, this is important because it affects loading states, rendering, and error handling.

For this project, the main examples are the posts list and the single post detail page.

---

## The three main ways to fetch data

### 1. `useFetch()`

This is the simplest and most common way to fetch page data in Nuxt.

```vue
<script setup lang="ts">
const { data: posts, status, error } = await useFetch("/api/post");
</script>
```

Use it when:

- you want a page to load data automatically
- you want built-in `status` and `error` support
- you are fetching data for the page itself

### 2. `useAsyncData()`

This is the more custom version of `useFetch()`. It gives you more control over the fetch key and logic.

```vue
<script setup lang="ts">
const { data, pending, error } = await useAsyncData("posts", () =>
  $fetch("/api/post"),
);
</script>
```

Use it when:

- you need more control
- you are building a custom fetching flow
- the fetch logic is more advanced

### 3. `$fetch()`

This is a direct fetch call. It is useful when you want a simple request without Nuxt’s reactive page helpers.

```ts
const post = await $fetch("/api/post/1");
```

Use it when:

- you are calling an API from a utility or composable
- you do not need reactive page state
- you want a lighter-weight request

---

## The big difference: `await` vs `lazy`

This is the part that usually matters most.

### `await useFetch()`

This waits for the data before the page renders.

```ts
const { data } = await useFetch("/api/post");
```

So the page is blocked until the request finishes.

### `useFetch(..., { lazy: true })`

This lets the page render first, then fetches the data in the background.

```ts
const {
  data: post,
  status,
  error,
} = await useFetch(`/api/post/${id}`, {
  lazy: true,
});
```

This is useful because it lets us show:

```vue
<div v-if="status === 'pending'">Loading post...</div>
```

without making the page wait unnecessarily.

That is why the detail page in this project uses `lazy: true`.

---

## Example in plain language

### List page

```vue
<script setup lang="ts">
const { data: posts, status, error } = await useFetch("/api/post");
</script>
```

This is used to load all posts and show a loading or error state if needed.

### Single post page

```vue
<script setup lang="ts">
const route = useRoute();
const {
  data: post,
  status,
  error,
} = await useFetch(`/api/post/${route.params.id}`, {
  lazy: true,
});
</script>
```

This is better for a single item because the user can see the page structure immediately while the data loads.

---

## Best practice for this project

For the posts app, the right pattern is:

- use `useFetch` for page data
- use `lazy: true` for single-item pages
- check `status` and `error` before rendering content
- handle invalid or missing ids with proper server-side errors

So the idea is simple:

- `await` blocks rendering
- `lazy: true` allows a loading state
- `useFetch` is the standard page-level fetch tool
- `useAsyncData` is for custom control
- `$fetch` is for direct, lightweight requests

That is the main thing to understand about data fetching in Nuxt.
