import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check for main heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Check for navigation
    await expect(page.getByRole("navigation")).toBeVisible();

    // Check for search form or CTA
    await expect(page.getByRole("button")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    // Click on flights link
    const flightsLink = page.getByRole("link", { name: /flights/i });
    if (await flightsLink.isVisible()) {
      await flightsLink.click();
      await expect(page).toHaveURL(/flights/);
    }
  });

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeToggle = page.locator("[data-testid='theme-toggle']").or(
      page.getByRole("button", { name: /theme|dark|light/i })
    );

    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Check if dark class is applied to html
      const html = page.locator("html");
      await expect(html).toHaveClass(/dark/);
    }
  });
});
