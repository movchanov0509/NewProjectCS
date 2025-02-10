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
        await this.removeItem1.click()
    }

    async clickCloseCart() {
        await this.closeCart.click()
    }
}