import { test, expect } from '@playwright/test'

async function login(page: any) {
  await page.goto('/login')
  await page.locator('#username').fill('chris')
  await page.locator('#password').fill('password123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/tasks', { timeout: 10000 })
}

test.describe('Tasks', () => {
  test('create a new task and it appears in the list', async ({ page }) => {
    await login(page)
    await page.locator('#title').fill('My E2E Task')
    await page.getByRole('button', { name: 'Add Task' }).click()
    await expect(page.getByText('My E2E Task')).toBeVisible()
  })

  test('logout redirects to login page', async ({ page }) => {
    await login(page)
    await page.getByRole('button', { name: 'Logout' }).click()
    await expect(page).toHaveURL('/login')
  })
})