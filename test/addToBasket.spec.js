import {expect} from "chai";
import {Browser, Builder, Capabilities} from "selenium-webdriver";
import {ProductPage} from "../pages/ProductPage.js";
import {BasketPage} from "../pages/BasketPage.js";
import {DEFAULT_BASKET_PAGE_URL, DEFAULT_PRODUCT_PAGE_URL, DEFAULT_PRODUCT_SIZE} from "../constants/constants.js";
import chrome from 'selenium-webdriver/chrome.js';

const service = new chrome.ServiceBuilder('node_modules/chromedriver/lib/chromedriver/chromedriver.exe');

describe('Add to Basket.', () => {
    beforeEach(async function () {
        const capabilities = {
            ...Capabilities.chrome(),
        };
        this.driver = await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(capabilities).forBrowser(Browser.CHROME).setChromeService(service).build();
        await this.driver.manage().window().maximize();
    });

    it('Should correct add to basket.', async function () {
        const catalogPage = new ProductPage(this.driver, DEFAULT_PRODUCT_SIZE);
        await catalogPage.openPage(DEFAULT_PRODUCT_PAGE_URL);
        await this.driver.executeScript("window.localStorage.clear();");
        await this.driver.executeScript("window.sessionStorage.clear();");
        const existSize = await catalogPage.hasProductOptions();
        await catalogPage.chooseSize(existSize);
        await catalogPage.addToBasket();
        const isSuccessMessage = await catalogPage.hasSuccessMessage();
        expect(isSuccessMessage).to.be.true;
        await catalogPage.hasUpdateCountIcon();
        if (existSize) {
            const basketPage = new BasketPage(this.driver, DEFAULT_PRODUCT_SIZE);
            await basketPage.openPage(DEFAULT_BASKET_PAGE_URL);
            await basketPage.checkCorrectSize();
        }
    }).timeout(20000);

    afterEach(async function () {
        await this.driver.quit();
    })
})
