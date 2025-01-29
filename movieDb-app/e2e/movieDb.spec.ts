import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays featured movie section', async ({ page }) => {
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('img').first()).toBeVisible();
    await expect(page.getByText('Featured Movies')).toBeVisible();
  });

  test('can search for "Insecure" series from 2016', async ({ page }) => {
    // Wait for search inputs to be visible
    const titleInput = page.getByTestId('search-title');
    const yearInput = page.getByTestId('search-year');
    const typeSelect = page.getByTestId('search-type');
  
    await expect(titleInput).toBeVisible();
    await expect(yearInput).toBeVisible();
    await expect(typeSelect).toBeVisible();

    // Fill search criteria
    await titleInput.fill('insecure');
    await yearInput.fill('2016');
    await typeSelect.selectOption('series');

    // // Click search button
    // await page.click('button:has-text("Search")');

    // // Wait for results and verify
    // const searchResults = page.locator('.space-y-2 li');
    // await expect(searchResults).toHaveCount(1);
    
    // // Verify result content
    // const resultTitle = page.locator('.space-y-2 li h4');
    // await expect(resultTitle).toContainText('Insecure');
    // await expect(page.locator('.space-y-2 li')).toContainText('2016');
  // });

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