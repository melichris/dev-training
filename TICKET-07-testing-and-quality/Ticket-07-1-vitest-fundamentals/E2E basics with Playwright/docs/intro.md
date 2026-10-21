# Introduction to Playwright

Playwright is a modern end-to-end (E2E) testing framework for web applications. It lets you automate real browser interactions such as opening pages, clicking buttons, filling forms, and checking page content.

## Installing Playwright

You can install Playwright using a package manager such as npm, yarn, or pnpm.

Example:
```bash
npm install -D @playwright/test
```

Or with yarn:
```bash
yarn add -D @playwright/test
```

Or with pnpm:
```bash
pnpm add -D @playwright/test
```

You can also install it using the VS Code extension if you prefer a graphical workflow.

## What’s Installed

When Playwright is installed, it sets up:
- the Playwright test runner
- browser engines for testing
- example test files and configuration
- tools for reporting and debugging

Example:
```bash
npx playwright install
```

## Running the Example Test

After installation, you can run the sample test included in the project:
```bash
npx playwright test
```

This executes the default example tests and helps confirm the setup is working correctly.

## HTML Test Reports

Playwright can generate a report in HTML format so you can review test results visually.

Example:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

This makes it easier to inspect passed/failed tests and debugging details.

## Running the Example Test in UI Mode

UI mode is useful when you want to debug tests in a browser-like interface.

Example:
```bash
npx playwright test --ui
```

This gives a visual view of tests and helps you troubleshoot issues faster.

## Updating Playwright

To update Playwright to the latest version:
```bash
npm install -D @playwright/test@latest
```

If the browser binaries are out of date, run:
```bash
npx playwright install
```

## System Requirements

Playwright works with a supported Node.js version and requires the browser binaries to be installed before running tests.

## What’s Next

After setup, the next step is to write your own E2E tests for real user scenarios.

Example:
```js
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

This demonstrates the basic pattern of visiting a page and checking that the expected content or title appears.