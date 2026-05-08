import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  const themes = ['cosmic', 'lofi-rain', 'noir', 'dream-neon'];

  test('clicking theme button should cycle to next theme', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const themeBtn = page.locator('[data-testid="btn-theme"]');

    // Verify initial theme
    await expect(html).toHaveAttribute('data-theme', 'cosmic');

    // Click to change theme
    await themeBtn.click();
    await page.waitForTimeout(200);

    // Should be lofi-rain
    await expect(html).toHaveAttribute('data-theme', 'lofi-rain');
  });

  test('should cycle through all 4 themes', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const themeBtn = page.locator('[data-testid="btn-theme"]');

    for (const theme of themes) {
      await expect(html).toHaveAttribute('data-theme', theme);
      await themeBtn.click();
      await page.waitForTimeout(200);
    }

    // Should be back to cosmic after cycling
    await expect(html).toHaveAttribute('data-theme', 'cosmic');
  });

  test('should wrap around from dream-neon to cosmic', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const themeBtn = page.locator('[data-testid="btn-theme"]');

    // Click 4 times to get to dream-neon
    for (let i = 0; i < 4; i++) {
      await themeBtn.click();
      await page.waitForTimeout(200);
    }

    await expect(html).toHaveAttribute('data-theme', 'cosmic');
  });

  test('theme should persist after page reload', async ({ page, context }) => {
    await page.goto('/');

    const themeBtn = page.locator('[data-testid="btn-theme"]');
    const html = page.locator('html');

    // Set theme to noir
    await themeBtn.click(); // lofi-rain
    await page.waitForTimeout(200);
    await themeBtn.click(); // noir
    await page.waitForTimeout(200);

    await expect(html).toHaveAttribute('data-theme', 'noir');

    // Reload page
    await page.reload();

    // Theme should still be noir
    await expect(html).toHaveAttribute('data-theme', 'noir');
  });

  test('theme should be stored in localStorage', async ({ page }) => {
    await page.goto('/');

    const themeBtn = page.locator('[data-testid="btn-theme"]');

    // Change to dream-neon (3 clicks from cosmic)
    for (let i = 0; i < 3; i++) {
      await themeBtn.click();
      await page.waitForTimeout(200);
    }

    // Check localStorage
    const theme = await page.evaluate(() => localStorage.getItem('velora-theme'));
    expect(theme).toBe('dream-neon');
  });
});
