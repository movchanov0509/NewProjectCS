import { test, Page, expect } from '@playwright/test';
import { Search } from '../pages/Search';
import { HomePage } from '../pages/HomePage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/productPage';
import { UrlSafelyCheck, checkTitleSafely, openSiteSafely, safeClick, safeFill } from '../pages/methods';


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

        await openSiteSafely(homePage.page);
        await checkTitleSafely(homePage.page)
        await UrlSafelyCheck(homePage.page, 'https://theconnectedshop.com/')

        await header.checkSearchLink();
        await safeClick(header.searchLink);

    })

    test(' searching of Product', async () => {
        await safeFill(search.searchInput, 'Smart Door Lock Sleek');
        await search.searchForProduct1('Smart Door Lock Sleek', '1 result')
        await search.verifyProductHref(search.productSmartDoor1,
            '/products/smart-door-lock-sleek?_pos=1&_sid=540ca91f1&_ss=r&variant=42880518815985')
    });


    test('check that product is absent', async () => {
        await safeFill(search.searchInput, 'Secret box')
        await search.searchNoResult();
    });


    test('find, add and remove product from cart', async () => {
        await search.searchInput.clear();
        await safeFill(search.searchInput, 'Smart Vacuum Robot');

        await search.searchForProduct2('Smart Vacuum Robot', '2 results')
        await safeClick(search.productSmartRobot1);

        await productPage.checkIncreaseQuantityButton();
        await safeClick(productPage.increaseQuantity);

        await productPage.checkQuantitySelector('1')

        await productPage.checkDecreaseQuantityButton();
        await safeClick(productPage.decreaseQuantity);

        await productPage.checkAddToCartButton();
        await safeClick(productPage.addToCartButton);

        await cartPage.checkremoveItem();
        await safeClick(cartPage.removeItem1);

        await cartPage.checkEmptyCart();
        await safeClick(cartPage.closeCart);

    })

})