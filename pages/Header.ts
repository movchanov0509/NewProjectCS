import { Locator, Page, expect } from '@playwright/test';
import exp from 'constants';

export class Header {
    readonly page: Page;
    readonly logoLink: Locator;
    readonly LogoPrimary: Locator;
    readonly LogoTransparent: Locator;
    readonly searchLink: Locator;
    readonly accountLink: Locator;
    readonly cartLink: Locator;
    readonly menuHome: Locator;
    readonly menuOnSale: Locator;
    readonly menuCollections: Locator;
    readonly menuPersonal: Locator;
    readonly menuTechTalk: Locator;
    readonly menuAboutUs: Locator;
    readonly menuFAQ: Locator;
    readonly menuContact: Locator;
    readonly menuCall: Locator;
    constructor(page: Page) {
        this.page = page;
        this.logoLink = page.locator('a.Header__LogoLink');
        this.LogoPrimary = page.locator('img.Header__LogoImage--primary');
        this.LogoTransparent = page.locator('img.Header__LogoImage--transparent');
        this.searchLink = page.locator('a[href="/search"]').nth(0);
        this.accountLink = page.locator('a[href="/account"]').nth(1);
        this.cartLink = page.locator('a[href="/cart"]').nth(0);
        this.menuHome = page.locator('a.Heading.u-h6[href="/"]').nth(1);
        this.menuOnSale = page.locator('a.Heading.u-h6[href="/collections/on-sale"]').nth(1);
        this.menuCollections = page.locator('a.Heading.u-h6[href="/pages/products"]');
        this.menuPersonal = page.locator('a.Heading.u-h6[href="/pages/businesses"]');
        this.menuTechTalk = page.locator('a.Heading.u-h6[href="/blogs/tech-talk"]').nth(1);
        this.menuAboutUs = page.locator('a.Heading.u-h6[href="/pages/about-us"]');
        this.menuFAQ = page.locator('a.Heading.u-h6[href="/pages/faqs"]').nth(1);
        this.menuContact = page.locator('a.Heading.u-h6[href="/pages/contact-us"]').nth(1);
        this.menuCall = page.locator('a[href="tel:3053303424"]').nth(1);
    }

    // стоврення методів
    async checkLogolink() {
        await expect(this.logoLink).toBeVisible();
        await expect(this.logoLink).toHaveAttribute('a', 'href="/"');
        await expect(this.logoLink).toBeTruthy();
    }

    async checkLogoPrimary() {
        await expect(this.LogoPrimary).toHaveAttribute('src', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x.png?v=1705959137');
        await expect(this.LogoPrimary).toHaveAttribute('srcset', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x.png?v=1705959137 1x, //theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x@2x.png?v=1705959137 2x');
        await expect(this.LogoPrimary).toHaveAttribute('width', '250');
        await expect(this.LogoPrimary).toHaveAttribute('height', '75px');
        await expect(this.LogoPrimary).toHaveAttribute('alt', 'The Connected Shop Logo');
    }

    async checkSearchLink() {
        await expect(this.searchLink).toBeVisible();
        await expect(this.searchLink).toHaveAttribute('a', 'class="Heading Link Link--primary Text--subdued u-h8"');
        await expect(this.searchLink).toHaveAttribute('a', 'data-action="toggle-search"')
        await expect(this.searchLink).toHaveText('Search');
    }

    async clickSearchLink() {
        await this.searchLink.click();
    }
}