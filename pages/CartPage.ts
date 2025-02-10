import { Locator, Page, expect } from '@playwright/test';


export class CartPage{
    readonly page: Page;
    readonly cartWithProduct: Locator;
    readonly cartText: Locator;
    readonly cartItemSmartRobot1: Locator;
    readonly removeItem1: Locator
    readonly emptyCart: Locator;
    readonly closeCart: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.cartWithProduct = page.locator('span[class="Drawer__Title Heading u-h4"]');
        this.cartText = page.locator('div[class="Drawer__Container"]').nth(1);
        this.cartItemSmartRobot1 = page.locator('a[href="/products/smart-vacuum-robot?variant=43306635657457"]');
        this.removeItem1 = page.locator('a[data-action="remove-item"]');
        this.emptyCart = page.locator('p[class="Cart__Empty Heading u-h5"]');
        this.closeCart = page.locator('button[data-drawer-id="sidebar-cart"]');
       
    }

    async clickRemoveItem() {
        await this.removeItem1.waitFor({ timeout: 30000 });
        await this.removeItem1.click()
    }

    async clickCloseCart() {
        await this.closeCart.click()
    }

    async checkEmptyCart() {
        await expect(this.emptyCart).toContainText('Your cart is empty');
        await expect(this.closeCart).toHaveAttribute('class', 'Drawer__Close Icon-Wrapper--clickable');
        await expect(this.closeCart).toHaveAttribute('aria-label', 'Close cart');
    }

    async checkremoveItem() {
        await expect(this.cartWithProduct).toContainText('Cart');
        await expect(this.cartText).toContainText('You are eligible for free shipping!');
        await expect(this.cartItemSmartRobot1).toContainText('Smart Vacuum Robot');
        await expect(this.removeItem1).toHaveAttribute('class', 'CartItem__Remove Link Link--underline Link--underlineShort');
    //     await expect(this.cartItemSmartRobot1).toHaveAttribute('data-quantity', '0');
    }

    
}