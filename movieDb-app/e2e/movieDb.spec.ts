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

  test('Home Page - can search for "Insecure" series from 2016', async ({ page }) => {
    
    // Get desktop search form
    const searchForm = page.getByTestId('search-form-desktop');
    await expect(searchForm).toBeVisible();

    await searchForm.getByTestId('search-title-input-desktop').fill('insecure');
    await searchForm.getByTestId('search-year-input-desktop').fill('2016');
  
    // Click Search
    await page.getByTestId('search-submit-desktop').click();
    
  
    await searchForm.getByTestId('search-submit-desktop').click();

    // Verify results
    const results = page.getByTestId('search-results-desktop');
    await expect(results).toBeVisible({ timeout: 10000 });

    await expect(results).toContainText('Insecure');
    await expect(results).toContainText('2016');
  });

  test('shows recommendations section', async ({ page }) => {
    const recommendationsHeader = page.getByText('Featured Movies');
    await expect(recommendationsHeader).toBeVisible();

    await expect(page.getByText('Featured Movies')).toBeVisible();
    
    const recommendations = page.locator('.grid-cols-1 > div');
    await expect(recommendations).toHaveCount(4);
  });

  test('navigates to movie details when clicking featured movie', async ({ page }) => {
    const firstRecommendation = page.locator('.grid-cols-1 > div').first();
    await expect(firstRecommendation).toBeVisible();
    
    await firstRecommendation.click();
    
    await expect(page.url()).toContain('/movies/');
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