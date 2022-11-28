import {HomePage} from "../archive/pages/pastebin/HomePage.js";
import {PastePage} from "../archive/pages/pastebin/PastePage.js";
import {Browser, Builder} from 'selenium-webdriver';
import {PASTEBIN_PAGE} from "../archive/constants/constants.js";

describe('1', () => {
    it('Should test I Can Win task.', async () => {
        const pasteText = 'Hello from WebDriver';
        const pasteTitle = 'helloweb';
        const expirationValue = "10 Minutes";

        const driver = await new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().window().maximize();

        try {
            const homePage = new HomePage(driver);
            await homePage.openPage(PASTEBIN_PAGE);
            await homePage.fillPasteText(pasteText);
            await homePage.fillPasteExpiration(expirationValue);
            await homePage.fillPasteTitle(pasteTitle);
            await homePage.createPaste();

            const pastePage = new PastePage(driver);
            await pastePage.checkPasteText(pasteText);
        } finally {
            await driver.quit();
        }
    }).timeout(20000);
})
