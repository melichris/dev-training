# End-to-End Testing in Nuxt

End-to-end testing helps verify that an application works as a whole, including page rendering, user interaction, and API behavior. In Nuxt, this is especially useful for checking real application flows in a browser.

## Setup

Before writing E2E tests in Nuxt, you need the correct configuration and timing setup so the app loads properly during tests.

### Nuxt Config

Your Nuxt app may need browser-testing configuration to enable E2E testing features and proper runtime behavior.

Example:
```js
export default defineNuxtConfig({
  devtools: { enabled: true }
})
```

### Timings

Tests should allow for page loading and asynchronous rendering. Some UI changes happen after the initial page load, so timing matters.

Example:
```js
await page.goto('/');
await expect(page.getByRole('heading')).toBeVisible();
```

### Features

Nuxt E2E testing may include features such as SSR, route handling, and browser rendering. These features help simulate real application behavior.

## APIs

Nuxt provides useful utilities for E2E testing.

### $fetch(url)

Used to fetch data from a URL in a Nuxt environment.

Example:
```js
const data = await $fetch('/api/posts')
```

### fetch(url)

Standard browser or server fetch can be used when needed.

Example:
```js
const response = await fetch('/api/posts')
const json = await response.json()
```

### url(path)

Helps generate a route URL for the app under test.

Example:
```js
const fullUrl = url('/about')
```

### getServerLogs()

Used to inspect server-side logs during testing.

Example:
```js
const logs = getServerLogs()
console.log(logs)
```

### clearServerLogs()

Clears captured logs before a new test run.

Example:
```js
clearServerLogs()
```

## Testing in a Browser

Nuxt supports testing in real browser environments.

### createPage(url)

This creates or opens a browser page for testing a route.

Example:
```js
const page = await createPage('/about')
await expect(page.getByRole('heading')).toContainText('About')
```

### Testing with Playwright Test Runner

You can combine Nuxt testing utilities with Playwright’s test runner for E2E coverage.

Example:
```js
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

This approach validates the app from the user’s perspective, including navigation, rendering, and interactions.