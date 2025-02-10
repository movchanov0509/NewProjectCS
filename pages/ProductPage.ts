import { Locator, Page, expect } from '@playwright/test';


export class ProductPage {
    readonly page: Page;
    readonly increaseQuantity: Locator;
    readonly quantity: Locator;
    readonly decreaseQuantity: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.increaseQuantity = page.locator('button[data-action="increase-quantity"]');
        this.quantity = page.locator('input[name="quantity"]');
        this.decreaseQuantity = page.locator('button[data-action="decrease-quantity"]');
        this.addToCartButton = page.locator('button[data-action="add-to-cart"]');
    }

    async clickIncreaseQuantity() {
        await this.increaseQuantity.click()
    }

    async clickDecreaseQuantity() {
        await this.decreaseQuantity.click()
    }
    
    async clickAddToCart() {
        await this.addToCartButton.click()
    }
}