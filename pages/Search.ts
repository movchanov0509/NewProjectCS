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
        this.productSmartDoor1 = page.locator('a[href = "/products/smart-door-lock-sleek?_pos=1&_sid=0d1c4cfef&_ss=r&variant=42880518815985]').nth(1);
        this.productSmartRobot1 = page.locator('a', { hasText: 'Smart Vacuum Robot' });
    }

    async fillSearchInput(value: string) {
        await this.searchInput.fill(value);
        await expect(this.searchInput).toHaveValue(value);
    }

    




}