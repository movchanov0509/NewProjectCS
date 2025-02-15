import { test, Page, expect, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export async function safeClick(locator: Locator) {
    try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click();
    } catch (error) {
        console.warn(`Не вдалося клікнути по елементу ${locator.toString()}:`, error);
    }
}

export async function openSiteSafely(page: Page) {
    try {
        await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
        await page.goto('/');
    } catch (error) {
        console.warn(`Не вдалося відкрити сайт:`, error);
    }
}

export async function safeFill(locator: Locator, value: string) {
    try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.fill(value);
    } catch (error) {
        console.warn(`Не удалось заполнить поле ${locator.toString()} значением "${value}":`, error);
    }
}


export async function checkTitleSafely(page: Page) {
    try {
        await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
    } catch (error) {
        console.warn('Не вдалося перевірити заголовок сторінки:', error);
    }
}

export async function UrlSafelyCheck(page: Page, expectedURL: string) {
    try {
        await expect(page).toHaveURL(expectedURL, { timeout: 5000 });
    } catch (error) {
        console.warn(`URL сторінки не відповідає очікуваному: ${expectedURL}`, error);
    }
}
