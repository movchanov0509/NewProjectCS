import { Locator, Page, expect } from '@playwright/test';


export class ProductPage {
    readonly page: Page;
    readonly increaseQuantity: Locator;
    readonly quantity: Locator;
    readonly decreaseQuantity: Locator;
    readonly addToCartButton: Locator;
    readonly pagePopUpClosed: Locator;
    readonly closeSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.increaseQuantity = page.locator('button[data-action="increase-quantity"]');
        this.quantity = page.locator('input[name="quantity"]');
        this.decreaseQuantity = page.locator('button[data-action="decrease-quantity"]');
        this.addToCartButton = page.locator('button[data-action="add-to-cart"]');
        this.pagePopUpClosed = page.locator('button[data-action="close-popup"]')
        this.closeSearch = page.locator('button[data-action="close-search"]')
    }

    async clickIncreaseQuantity() {
        await this.increaseQuantity.waitFor({ timeout: 30000 });
        await this.increaseQuantity.click()
    }

    async clickDecreaseQuantity() {
        await this.decreaseQuantity.click()
    }
    


    async checkAddToCartButton() {
        await expect(this.addToCartButton).toHaveAttribute('type', 'submit');
        await expect(this.addToCartButton).toHaveAttribute('data-use-primary-button', 'false');
        await expect(this.addToCartButton).toHaveAttribute('class', 'ProductForm__AddToCart Button Button--secondary Button--full');
    }

    async clickAddToCart() {
        // await this.pagePopUpClosed.click()
        // await this.closeSearch.click()
        await this.addToCartButton.click();
    }

    async checkDecreaseQuantityButton() {
        await expect(this.decreaseQuantity).toHaveAttribute('type', 'button');
        await expect(this.decreaseQuantity).toHaveAttribute('class', 'QuantitySelector__Button Link Link--secondary');
    }

    async checkQuantitySelector(expectedValue: string = '1') {
        await expect(this.quantity).toHaveAttribute('class', 'QuantitySelector__CurrentQuantity');
        await expect(this.quantity).toHaveAttribute('value', expectedValue);
    }

    async checkIncreaseQuantityButton() {
        await expect(this.increaseQuantity).toHaveAttribute('type', 'button');
        await expect(this.increaseQuantity).toHaveAttribute('class', 'QuantitySelector__Button Link Link--secondary');
    }
}