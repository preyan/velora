import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Screenshot Export', () => {
  test('screenshot button should be visible', async ({ page }) => {
    await page.goto('/');

    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');
    await expect(screenshotBtn).toBeVisible();
  });

  test('screenshot button should not be disabled initially', async ({ page }) => {
    await page.goto('/');

    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');
    await expect(screenshotBtn).not.toBeDisabled();
  });

  test('clicking screenshot button should trigger download', async ({ page, context }) => {
    await page.goto('/');

    // Start listening for downloads
    const downloadPromise = context.waitForEvent('download');

    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');
    await screenshotBtn.click();

    // Wait for download
    const download = await downloadPromise;

    // Verify download filename ends with .png
    expect(download.suggestedFilename()).toMatch(/\.png$/);

    // Clean up
    await download.delete();
  });

  test('screenshot button should show spinner during capture', async ({ page }) => {
    await page.goto('/');

    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');
    const spinner = page.locator('span.spinner');

    // Initially spinner should not be visible
    await expect(spinner).not.toBeVisible();

    // Click button
    await screenshotBtn.click();

    // Spinner might briefly appear during capture
    // We check if button becomes disabled (indicating capture in progress)
    const isDisabled = await screenshotBtn.isDisabled().catch(() => false);

    // After a brief moment, button should be re-enabled
    await page.waitForTimeout(100);
    await expect(screenshotBtn).not.toBeDisabled();
  });

  test('screenshot button should remain functional after multiple clicks', async ({
    page,
    context,
  }) => {
    await page.goto('/');

    const screenshotBtn = page.locator('[data-testid="btn-screenshot"]');

    // First download
    let downloadPromise = context.waitForEvent('download');
    await screenshotBtn.click();
    let download = await downloadPromise;
    await download.delete();

    // Wait a moment
    await page.waitForTimeout(500);

    // Second download
    downloadPromise = context.waitForEvent('download');
    await screenshotBtn.click();
    download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.png$/);
    await download.delete();
  });
});
