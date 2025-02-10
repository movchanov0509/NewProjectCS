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

    })

    test(' searching of Product', async () => {
        await search.fillSearchInput('Smart Door Lock Sleek');
        await search.searchForProduct1('Smart Door Lock Sleek', '1 result')
        await search.verifyProductHref(search.productSmartDoor1,
            '/products/smart-door-lock-sleek?_pos=1&_sid=7e68ac181&_ss=r&variant=42880518815985')
    });


    test('check that product is absent', async () => {
        await search.fillSearchInput('Secret box');
        await search.searchNoResult();
    });


    test('find, add and remove product from cart', async () => {
        await search.searchInput.clear();
        await search.fillSearchInput('Smart Vacuum Robot');

        await search.searchForProduct2('Smart Vacuum Robot', '4 result')
        await search.productSmartRobot1.click();

        await productPage.checkIncreaseQuantityButton();
        await productPage.clickIncreaseQuantity()

        await productPage.checkQuantitySelector('1')

        await productPage.checkDecreaseQuantityButton();
        await productPage.clickDecreaseQuantity();

        await productPage.checkAddToCartButton();
        await productPage.clickAddToCart();

        await cartPage.checkremoveItem()
        await cartPage.clickRemoveItem();

        await cartPage.checkEmptyCart();
        await cartPage.clickCloseCart();

    })

})