# Introduction to Playwright Locators

A locator is Playwright’s main way to find elements in the page. Instead of writing brittle selectors by hand, locators help you target elements in a stable and readable way.

## Quick Guide

Use locators to find elements based on their role, label, text, attributes, or custom test IDs. This makes tests easier to maintain and closer to how users interact with the page.

## Locating Elements

Playwright supports several ways to locate elements.

### Locate by role

Use the element's accessible role, which is usually the clearest and most user-friendly approach.

Example:
```js
await page.getByRole('button', { name: 'Submit' }).click();
```

### Locate by label

Use labels when dealing with form controls.

Example:
```js
await page.getByLabel('Email').fill('user@example.com');
```

### Locate by placeholder

Use placeholder text when a field has a visible hint.

Example:
```js
await page.getByPlaceholder('Enter your name').fill('John');
```

### Locate by text

Use visible text content for buttons, links, and headings.

Example:
```js
await page.getByText('Sign in').click();
```

### Locate by alt text

Useful for images and other elements with alt attributes.

Example:
```js
await page.getByAltText('Product image').click();
```

### Locate by title

Use the `title` attribute when appropriate.

Example:
```js
await page.getByTitle('Close dialog').click();
```

### Locate by test id

This is often the most reliable when your app exposes `data-testid` attributes.

Example:
```js
await page.getByTestId('login-button').click();
```

### Locate by CSS or XPath

Playwright also supports fallback selectors when needed.

Example:
```js
await page.locator('.submit-btn').click();
await page.locator('//button[@type="submit"]').click();
```

## Locate in Shadow DOM

If an element is inside a shadow DOM, Playwright can still locate it with standard locators.

Example:
```js
await page.locator('my-component').locator('button').click();
```

This helps when components are encapsulated and not directly accessible through the normal DOM tree.

## Filtering Locators

You can narrow a locator by different conditions.

### Filter by text
```js
await page.locator('li').filter({ hasText: 'Completed' });
```

### Filter by not having text
```js
await page.locator('li').filter({ hasNotText: 'Archived' });
```

### Filter by child/descendant
```js
await page.locator('div').filter({ has: page.locator('button') });
```

### Filter by not having child/descendant
```js
await page.locator('div').filter({ hasNot: page.locator('span') });
```

## Locator Operators

Playwright allows combining locators in useful ways.

### Matching inside a locator
```js
const card = page.locator('.card');
await card.getByRole('button').click();
```

### Matching two locators simultaneously
```js
await page.locator('.form').getByRole('textbox').fill('Hello');
```

### Matching one of two alternative locators
```js
await page.getByRole('button', { name: 'Save' }).or(page.getByRole('button', { name: 'Submit' })).click();
```

### Matching only visible elements
```js
await page.getByRole('button').filter({ has: page.locator(':visible') });
```

## Lists

Locators are often used to work with repeated elements like list items.

### Count items in a list
```js
const items = page.locator('li');
await expect(items).toHaveCount(5);
```

### Assert all text in a list
```js
await expect(page.locator('li')).toHaveText(['One', 'Two', 'Three']);
```

### Get a specific item
```js
await page.locator('li').nth(2).click();
```

### Chaining filters
```js
await page.locator('li').filter({ hasText: 'Active' }).click();
```

### Rare use cases
Sometimes you need more advanced selection logic, such as dealing with repeated UI patterns, nested components, or generated elements.

## Strictness

Playwright locators are usually strict, meaning they fail if the target element is missing or multiple matches exist unexpectedly. This helps catch broken selectors early.

Example:
```js
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
```

## More Locators

Playwright includes many locator strategies beyond the basics. As you progress, you’ll often use a combination of:
- roles
- labels
- text
- CSS selectors
- test IDs
- visibility and filtering rules

The best locator is usually the one that reflects how a real user interacts with the app.