import { test, expect } from '@playwright/test';

test.describe('Audio Controls', () => {
  test('mute button should toggle aria-label between Mute and Unmute', async ({ page }) => {
    await page.goto('/');

    const muteBtn = page.locator('[data-testid="btn-mute"]');

    // Initial state should be "Mute audio"
    await expect(muteBtn).toHaveAttribute('aria-label', 'Mute audio');

    // Click mute
    await muteBtn.click();
    await page.waitForTimeout(200);

    // Should now be "Unmute audio"
    await expect(muteBtn).toHaveAttribute('aria-label', 'Unmute audio');

    // Click again
    await muteBtn.click();
    await page.waitForTimeout(200);

    // Should be back to "Mute audio"
    await expect(muteBtn).toHaveAttribute('aria-label', 'Mute audio');
  });

  test('track select should have three options', async ({ page }) => {
    await page.goto('/');

    const trackSelect = page.locator('[data-testid="select-track"]');
    const options = trackSelect.locator('option');

    const count = await options.count();
    expect(count).toBe(3);

    const values = await options.allTextContents();
    expect(values).toContain('Rain');
    expect(values).toContain('Piano');
    expect(values).toContain('Cosmic');
  });

  test('changing track select should update the value', async ({ page }) => {
    await page.goto('/');

    const trackSelect = page.locator('[data-testid="select-track"]');

    // Verify initial value
    await expect(trackSelect).toHaveValue('rain');

    // Change to piano
    await trackSelect.selectOption('piano');
    await page.waitForTimeout(200);

    await expect(trackSelect).toHaveValue('piano');

    // Change to cosmic
    await trackSelect.selectOption('cosmic');
    await page.waitForTimeout(200);

    await expect(trackSelect).toHaveValue('cosmic');
  });

  test('mute state should persist after page reload', async ({ page }) => {
    await page.goto('/');

    const muteBtn = page.locator('[data-testid="btn-mute"]');

    // Click mute
    await muteBtn.click();
    await page.waitForTimeout(200);
    await expect(muteBtn).toHaveAttribute('aria-label', 'Unmute audio');

    // Reload page
    await page.reload();

    // Mute state should persist
    await expect(muteBtn).toHaveAttribute('aria-label', 'Unmute audio');
  });

  test('mute state should be stored in localStorage', async ({ page }) => {
    await page.goto('/');

    const muteBtn = page.locator('[data-testid="btn-mute"]');

    // Click mute
    await muteBtn.click();
    await page.waitForTimeout(200);

    // Check localStorage
    const muted = await page.evaluate(() => localStorage.getItem('velora-muted'));
    expect(muted).toBe('true');

    // Click unmute
    await muteBtn.click();
    await page.waitForTimeout(200);

    // Check localStorage again
    const unmuted = await page.evaluate(() => localStorage.getItem('velora-muted'));
    expect(unmuted).toBe('false');
  });

  test('play button should be visible when not playing', async ({ page }) => {
    await page.goto('/');

    const playBtn = page.locator('[data-testid="btn-play"]');
    await expect(playBtn).toBeVisible();
  });

  test('stop button should be visible when playing', async ({ page }) => {
    await page.goto('/');

    const playBtn = page.locator('[data-testid="btn-play"]');
    const stopBtn = page.locator('[data-testid="btn-stop"]');

    // Click play
    await playBtn.click();
    await page.waitForTimeout(200);

    // Stop button should now be visible
    await expect(stopBtn).toBeVisible();
  });
});
