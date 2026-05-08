import { test, expect } from '@playwright/test';

test.describe('Velora App — Initial Load', () => {
  test('should load the app without errors', async ({ page }) => {
    await page.goto('/');
    expect(page).toBeDefined();
  });

  test('should display the first quote (Steve Jobs)', async ({ page }) => {
    await page.goto('/');
    const quoteText = page.locator('[data-testid="quote-text"]');
    await expect(quoteText).toBeVisible();
    await expect(quoteText).toContainText('The only way to do great work');
  });

  test('should display the quote author', async ({ page }) => {
    await page.goto('/');
    const author = page.locator('[data-testid="quote-author"]');
    await expect(author).toBeVisible();
    await expect(author).toContainText('Steve Jobs');
  });

  test('should default to cosmic theme', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'cosmic');
  });

  test('should have navigation buttons', async ({ page }) => {
    await page.goto('/');
    const prevBtn = page.locator('[data-testid="btn-prev"]');
    const nextBtn = page.locator('[data-testid="btn-next"]');
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
  });

  test('should have theme switcher', async ({ page }) => {
    await page.goto('/');
    const themeBtn = page.locator('[data-testid="btn-theme"]');
    await expect(themeBtn).toBeVisible();
  });

  test('should have mute button', async ({ page }) => {
    await page.goto('/');
    const muteBtn = page.locator('[data-testid="btn-mute"]');
    await expect(muteBtn).toBeVisible();
  });

  test('should have screenshot button', async ({ page }) => {
    await page.goto('/');
    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');
    await expect(screenshotBtn).toBeVisible();
  });
});
