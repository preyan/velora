import { test, expect } from '@playwright/test';

test.describe('Keyboard Shortcuts', () => {
  test('ArrowRight should navigate to next quote', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500); // Wait for app to load

    const quoteText = page.locator('[data-testid="quote-text"]');
    const initialText = await quoteText.textContent();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1200);

    const newText = await quoteText.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('ArrowLeft should navigate to previous quote', async ({ page }) => {
    await page.goto('/');

    // Move forward
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    // Move back
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);

    // Should be back to Steve Jobs
    const quoteText = page.locator('[data-testid="quote-text"]');
    await expect(quoteText).toContainText('The only way to do great work');
  });

  test('n key should navigate to next quote', async ({ page }) => {
    await page.goto('/');

    const quoteText = page.locator('[data-testid="quote-text"]');
    const initialText = await quoteText.textContent();

    await page.keyboard.press('n');
    await page.waitForTimeout(500);

    const newText = await quoteText.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('N (uppercase) should navigate to next quote', async ({ page }) => {
    await page.goto('/');

    const quoteText = page.locator('[data-testid="quote-text"]');
    const initialText = await quoteText.textContent();

    await page.keyboard.press('Shift+N');
    await page.waitForTimeout(500);

    const newText = await quoteText.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('p key should navigate to previous quote', async ({ page }) => {
    await page.goto('/');

    // Move forward first
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    // Move back with p
    await page.keyboard.press('p');
    await page.waitForTimeout(300);

    // Should be back to Steve Jobs
    const quoteText = page.locator('[data-testid="quote-text"]');
    await expect(quoteText).toContainText('The only way to do great work');
  });

  test('P (uppercase) should navigate to previous quote', async ({ page }) => {
    await page.goto('/');

    // Move forward first
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    // Move back with P
    await page.keyboard.press('Shift+P');
    await page.waitForTimeout(300);

    // Should be back to Steve Jobs
    const quoteText = page.locator('[data-testid="quote-text"]');
    await expect(quoteText).toContainText('The only way to do great work');
  });

  test('t key should change theme', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');

    await expect(html).toHaveAttribute('data-theme', 'cosmic');

    await page.keyboard.press('t');
    await page.waitForTimeout(300);

    await expect(html).toHaveAttribute('data-theme', 'lofi-rain');
  });

  test('multiple t key presses should cycle themes', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');

    // Press t three times
    await page.keyboard.press('t');
    await page.waitForTimeout(200);
    await page.keyboard.press('t');
    await page.waitForTimeout(200);
    await page.keyboard.press('t');
    await page.waitForTimeout(200);

    // Should be on dream-neon (3 cycles from cosmic)
    await expect(html).toHaveAttribute('data-theme', 'dream-neon');
  });
});
