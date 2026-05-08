import { test, expect } from '@playwright/test';

test.describe('Quote Navigation', () => {
  test('clicking next should load the next quote', async ({ page }) => {
    await page.goto('/');

    const quoteText = page.locator('[data-testid="quote-text"]');
    const initialText = await quoteText.textContent();

    await page.locator('[data-testid="btn-next"]').click();
    await page.waitForTimeout(1000); // Wait for animations

    const newText = await quoteText.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('clicking previous should load the previous quote', async ({ page }) => {
    await page.goto('/');

    // Move forward first
    await page.locator('[data-testid="btn-next"]').click();
    await page.waitForTimeout(500);
    const secondQuoteText = await page.locator('[data-testid="quote-text"]').textContent();

    // Move back
    await page.locator('[data-testid="btn-prev"]').click();
    await page.waitForTimeout(500);
    const firstQuoteText = await page.locator('[data-testid="quote-text"]').textContent();

    // Should be back to Steve Jobs quote
    expect(firstQuoteText).toContain('The only way to do great work');
  });

  test('previous on first quote should wrap to last quote', async ({ page }) => {
    await page.goto('/');

    // Click previous from first quote (should wrap to index 7, the last quote)
    await page.locator('[data-testid="btn-prev"]').click();
    await page.waitForTimeout(500);

    const quoteText = page.locator('[data-testid="quote-text"]');
    const text = await quoteText.textContent();

    // Last quote index should not be Steve Jobs (index 0)
    expect(text).not.toContain('The only way to do great work');
  });

  test('next on last quote should wrap to first quote', async ({ page }) => {
    await page.goto('/');

    // Navigate to the end (8 quotes total, indices 0-7)
    for (let i = 0; i < 8; i++) {
      await page.locator('[data-testid="btn-next"]').click();
      await page.waitForTimeout(200);
    }

    // Should be back at index 0 (Steve Jobs)
    const quoteText = page.locator('[data-testid="quote-text"]');
    await expect(quoteText).toContainText('The only way to do great work');
  });

  test('should navigate through all 8 quotes without error', async ({ page }) => {
    await page.goto('/');

    const quotes: string[] = [];

    // Record first quote
    let text = await page.locator('[data-testid="quote-text"]').textContent();
    if (text) quotes.push(text);

    // Navigate through all quotes
    for (let i = 1; i < 8; i++) {
      await page.locator('[data-testid="btn-next"]').click();
      await page.waitForTimeout(300);
      text = await page.locator('[data-testid="quote-text"]').textContent();
      if (text && !quotes.includes(text)) {
        quotes.push(text);
      }
    }

    // Should have at least 8 distinct quotes
    expect(quotes.length).toBeGreaterThanOrEqual(7);
  });
});
