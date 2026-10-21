# Auto-Waiting in Playwright

Playwright automatically waits for elements and actions to be ready before performing actions or assertions. This helps reduce flaky tests because you do not have to add manual delays in many cases.

## Introduction

Auto-waiting means Playwright waits until the target condition is met before continuing. For example, it waits for a page to load, an element to appear, or a button to become enabled before clicking it.

Example:
```js
await page.getByRole('button', { name: 'Submit' }).click();
```

Playwright will wait for the button to be attached and actionable before it tries to click.

## Forcing Actions

Sometimes an action may be attempted before the UI is ready. Playwright normally handles this automatically, but you can still force patterns in tests when needed.

Example:
```js
await page.locator('#submit').click({ force: true });
```

This bypasses the normal actionability check and should be used carefully, because it can hide real UI problems.

## Assertions

Assertions in Playwright also wait automatically. This is important because many UI elements take time to render or update after a state change.

Example:
```js
await expect(page.getByText('Welcome back')).toBeVisible();
```

Playwright will keep retrying until the expectation passes or the timeout is reached.

## Visible

A common assertion is checking if an element is visible.

Example:
```js
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

This waits until the heading appears and is visible to the user.

## Stable

Playwright can wait for an element to become stable before interacting with it. This is useful when animations or re-renders are happening.

Example:
```js
await expect(page.locator('.modal')).toBeStable();
```

This helps avoid interacting with elements while they are still moving or updating.

## Enabled

Before clicking a button or filling a field, Playwright ensures the control is enabled.

Example:
```js
await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
await page.getByRole('button', { name: 'Save' }).click();
```

This reduces failures caused by disabled controls or delayed state changes.

## Editable

Fields may not be immediately editable, especially after loading or rerendering the form.

Example:
```js
await expect(page.getByLabel('Email')).toBeEditable();
await page.getByLabel('Email').fill('test@example.com');
```

This waits until the input is ready to accept text.

## Receives Events

Some actions require the element to be ready to receive events like clicks or focus.

Example:
```js
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await page.getByRole('button', { name: 'Submit' }).click();
```

Playwright waits until the element is in a usable state before firing the event.

In short, Playwright auto-waiting helps make tests more reliable by handling timing issues automatically, especially when the UI updates asynchronously.