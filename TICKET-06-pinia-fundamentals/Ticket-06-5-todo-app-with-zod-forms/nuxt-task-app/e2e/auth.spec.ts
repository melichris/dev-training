import { test, expect } from '@playwright/test'

test.describe('Auth', () => {
  test('visiting /tasks when logged out redirects to /login', async ({ page }) => {
    await page.goto('/tasks')
    await expect(page).toHaveURL('/login')
  })

  test('short credentials show validation errors', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#username').fill('ab')
    await page.locator('#password').fill('123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Username must be at least 3 characters')).toBeVisible()
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible()
  })

  test('valid login redirects to /tasks', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#username').fill('chris')
    await page.locator('#password').fill('password123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/tasks')
  })
})