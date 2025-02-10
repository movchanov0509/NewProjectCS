import { Page, expect } from '@playwright/test';

export class HomePage{
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async checkTitle() {
        await expect(this.page).toHaveURL('https://theconnectedshop.com/');
    }

    async checkUrl() {
        await expect(this.page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
    }

    async openSite() {
        await this.page.goto('/')
    }
        
}