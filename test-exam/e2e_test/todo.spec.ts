import { test, expect } from '@playwright/test';

test.describe('Notes Management', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('should create a note', async ({ page }) => {
        await page.fill('input[name="title"]', 'Math');
        await page.fill('input[name="score"]', '16');
        await page.fill('textarea[name="comment"]', 'Good performance');
        await page.click('button[type="submit"]');

        await expect(page.locator('text=Math')).toBeVisible();
        await expect(page.locator('text=Good performance')).toBeVisible();
    });

    test('should delete a note', async ({ page }) => {
        await page.fill('input[name="title"]', 'History');
        await page.fill('input[name="score"]', '18');
        await page.fill('textarea[name="comment"]', 'Excellent performance');
        await page.click('button[type="submit"]');

        await page.click('text=History');
        await page.click('button:text("Delete")');

        await expect(page.locator('text=History')).not.toBeVisible();
    });

    test('should edit a note', async ({ page }) => {
        await page.fill('input[name="title"]', 'History');
        await page.fill('input[name="score"]', '18');
        await page.fill('textarea[name="comment"]', 'Excellent performance');
        await page.click('button[type="submit"]');

        await page.click('text=History');
        await page.click('button:text("Edit")');

        await page.click('.modal-close');

        await page.fill('input[name="title"]', 'History Edited');
        await page.fill('input[name="score"]', '19');
        await page.fill('textarea[name="comment"]', 'Excellent performance edited');
        await page.click('button[type="submit"]');

        await expect(page.locator('text=History Edited')).toBeVisible();
    });
});
