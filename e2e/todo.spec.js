// e2e/todo.spec.js
import { test, expect } from '@playwright/test';

test.describe('Todo App — E2E тести', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('додає нове завдання через форму', async ({ page }) => {
    const input = page.locator('#todo-input');
    await input.fill('Моє тестове завдання');
    await page.locator('.add-btn').click();

    await expect(page.locator('#todo-list')).toContainText('Моє тестове завдання');
  });

  test('не додає завдання з порожнім текстом', async ({ page }) => {
    const initialCount = await page.locator('#todo-list li').count();

    await page.locator('#todo-input').fill('');
    await page.locator('.add-btn').click();

    const newCount = await page.locator('#todo-list li').count();
    expect(newCount).toBe(initialCount);
  });

  test('сторінка завантажується і показує форму', async ({ page }) => {
    await expect(page).toHaveTitle(/Todo/);
    await expect(page.locator('#todo-input')).toBeVisible();
    await expect(page.locator('.add-btn')).toBeVisible();
  });

});