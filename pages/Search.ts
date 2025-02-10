import { Locator, Page, expect } from '@playwright/test';


export class Search {
    readonly page: Page;
    readonly searchForm: Locator;
    readonly searchInput: Locator;
    readonly searchInputHidden: Locator;
    readonly result: Locator;
    readonly noResult: Locator;
    readonly productSmartDoor1: Locator;
    readonly productSmartRobot1: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchForm = page.locator('form[action="/search"]');
        this.searchInput = page.locator('input[class="Search__Input Heading"]');
        this.searchInputHidden = page.locator('input[name="type"]');
        this.result = page.locator('span[class="Heading Text--subdued u-h7"]').nth(0);
        this.noResult = page.locator('div[class="Segment__Content"]').nth(0);
        this.productSmartDoor1 = page.locator('a', { hasText: 'Smart Door Lock Sleek' }).nth(0);
        this.productSmartRobot1 = page.locator('a', { hasText: 'Smart Vacuum Robot' }).nth(0);
    }

    async fillSearchInput(value: string) {
        await this.searchInput.fill(value);
        await expect(this.searchInput).toHaveValue(value);
    }

    async verifyProductHref(product: Locator, expectedHref: string) {
        await expect(product).toHaveAttribute('href', expectedHref);
    }

    async searchNoResult() {
        await expect(this.noResult).toContainText('No results could be found');
    }

    async searchForProduct1(productName: string, expectedResults: string) {
        await this.searchInput.clear();
        await this.searchInput.fill(productName);

        await expect(this.result).toContainText(expectedResults);
        await expect(this.productSmartDoor1).toContainText(productName);
    }

    async searchForProduct2(productName: string, expectedResults: string) {
        await this.searchInput.clear();
        await this.searchInput.fill(productName);

        await expect(this.result).toContainText(expectedResults);
        await expect(this.productSmartRobot1).toContainText(productName);
    }

    

    




}