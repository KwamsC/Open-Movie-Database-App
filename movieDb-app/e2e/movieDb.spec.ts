import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays featured movie section', async ({ page }) => {
    const desktopHeader = page.getByTestId('desktop-header');
    await expect(desktopHeader).toBeVisible();
    await expect(desktopHeader).toHaveText('MovieDB');
  });

  test('shows recommendations section', async ({ page }) => {
    await expect(page.getByText('Featured Movies')).toBeVisible();
    const recommendations = page.locator('.grid-cols-1 > a');
    await expect(recommendations).toHaveCount(4);
  });

  test('navigates to movie details when clicking featured movie', async ({ page }) => {
    const recommendation = page.locator('.grid-cols-1 > a').first();
    await recommendation.click();
    await expect(page.url()).toContain('/movies/');
  });

  test('shows loading state', async ({ page }) => {
    await page.reload();
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('handles error state', async ({ page }) => {
    // Simulate error by intercepting API call
    await page.route('**/api/v1/movies/*', (route) => {
      route.fulfill({
        status: 500,
        body: 'Internal Server Error'
      });
    });
    await page.reload();
    await expect(page.getByText(/error/i)).toBeVisible();
  });
});