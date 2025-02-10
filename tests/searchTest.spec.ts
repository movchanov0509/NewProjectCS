import { test, Page, expect } from '@playwright/test';
import { Search } from '../pages/Search';
import { HomePage } from '../pages/HomePage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/productPage';


//створення тест сьюта
test.describe('Check functionality of search', async () => {
    let homePage: HomePage;
    let header: Header;
    let search: Search;
    let productPage: ProductPage;
    let cartPage: CartPage;


    // прекондішини
    test.beforeEach( async ({ page }) => {
        //ініціалізація сторінок
        homePage = new HomePage(page);
        header = new Header(page);
        search = new Search(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await homePage.openSite();
        await homePage.checkTitle();
        await homePage.checkUrl();

        await header.checkSearchLink();
        await header.clickSearchLink();

        await productPage.clickAddToCart();
        await productPage.clickDecreaseQuantity();
        await productPage.clickIncreaseQuantity();

        await cartPage.clickCloseCart();
        await cartPage.clickRemoveItem();

        //await search.fillSearchInput(value);

    })

    test(' searching of Product', async () => {
        await search.fillSearchInput('Smart Door Lock Sleek');
        await expect(search.searchInput).toHaveValue('Smart Door Lock Sleek');

        await expect(search.result).toContainText('1 result');
        await expect(search.productSmartDoor1).toHaveAttribute('href', '/products/smart-door-lock-sleek?_pos=1&_sid=4d4187b5a&_ss=r&variant=42880518815985');
        await expect(search.productSmartDoor1).toContainText('Smart Door Lock Sleek');
    })


    test('check that product is absent', async () => {
        await search.fillSearchInput('Secret box');
        await expect(search.searchInput).toHaveValue('Secret box');
        await expect(search.noResult).toContainText('No results could be found');
    })


    test('find, add and remove product from cart', async () => {
        await search.searchInput.clear();
        await search.fillSearchInput('Smart Vacuum Robot');

        await expect(search.result).toContainText('4 result');
        await expect(search.productSmartRobot1).toContainText('Smart Vacuum Robot');
        await search.productSmartRobot1.click();

        await expect(productPage.increaseQuantity).toHaveAttribute('type', 'button');
        await expect(productPage.increaseQuantity).toHaveAttribute('class', 'QuantitySelector__Button Link Link--secondary');
        await productPage.clickIncreaseQuantity()

        await expect(productPage.quantity).toHaveAttribute('class', 'QuantitySelector__CurrentQuantity');
        await expect(productPage.quantity).toHaveAttribute('value', '1');

        await expect(productPage.decreaseQuantity).toHaveAttribute('type', 'button');
        await expect(productPage.decreaseQuantity).toHaveAttribute('class', 'QuantitySelector__Button Link Link--secondary');
        await productPage.clickDecreaseQuantity()

        await expect(productPage.addToCartButton).toHaveAttribute('type', 'submit');
        await expect(productPage.addToCartButton).toHaveAttribute('data-use-primary-button', 'false');
        await expect(productPage.addToCartButton).toHaveAttribute('class', 'ProductForm__AddToCart Button Button--secondary Button--full');
        await productPage.clickAddToCart()

        await expect(cartPage.cartWithProduct).toContainText('Cart');
        await expect(cartPage.cartText).toContainText('You are eligible for free shipping!');
        await expect(cartPage.cartItemSmartRobot1).toContainText('Smart Vacuum Robot');
        await expect(cartPage.removeItem1).toHaveAttribute('class', 'CartItem__Remove Link Link--underline Link--underlineShort');
        await expect(cartPage.cartItemSmartRobot1).toHaveAttribute('data-quantity', '0');
        await cartPage.clickRemoveItem();

        await expect(cartPage.emptyCart).toContainText('Your cart is empty');
        await expect(cartPage.closeCart).toHaveAttribute('class', 'Drawer__Close Icon-Wrapper--clickable');
        await expect(cartPage.closeCart).toHaveAttribute('aria-label', 'Close cart');
        await cartPage.clickCloseCart();

    })

})