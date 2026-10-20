import { test, expect } from '@playwright/test'

test.describe('Auth', () => {
  test('valid login redirects to tasks page', async ({ page }) => {
    await page.goto('/login')
    await page.locator('#username').fill('chris')
    await page.locator('#password').fill('password123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/tasks', { timeout: 10000 })
  })

  test('invalid login shows validation error', async ({ page }) => {
    await page.goto('/login')
    await page.locator('#username').fill('ab')
    await page.locator('#password').fill('123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('at least 3 characters')).toBeVisible()
  })

  test('visiting /tasks when logged out redirects to /login', async ({ page }) => {
    await page.goto('/tasks')
    await expect(page).toHaveURL('/login')
  })
})