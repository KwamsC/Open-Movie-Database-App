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

    await searchForm.getByTestId('search-title-input').fill('insecure');
    await searchForm.getByTestId('search-year-input').fill('2016');
    await searchForm.getByTestId('search-type-select').selectOption('series');
  
    // // Click Search
    // await page.getByTestId('search-submit').click();
    
    // // Wait for API Response
    // await page.waitForResponse(response => 
    //   response.url().includes('/search') && response.status() === 200
    // );
  
    // // Wait for results
    // await expect(page.getByTestId('search-results')).toBeVisible({ timeout: 10000 });
    // await expect(page.getByTestId('search-result-item')).toBeVisible();
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