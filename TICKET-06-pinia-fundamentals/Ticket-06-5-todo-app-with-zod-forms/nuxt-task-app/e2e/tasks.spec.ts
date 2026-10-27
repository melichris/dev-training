import { test, expect, type Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
  await page.locator("#username").fill("chris");
  await page.locator("#password").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("/tasks");
  await page.waitForLoadState("networkidle");
}

test.describe("Tasks", () => {
  test("create a task and it appears in the list", async ({ page }) => {
    const title = `E2E Task ${Date.now()}`;
    await login(page);
    await page.locator("#title").fill(title);
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByText(title)).toBeVisible();
  });

  test("logged in session survives a reload", async ({ page }) => {
    await login(page);
    await page.reload();
    await expect(page).toHaveURL("/tasks");
  });
});
