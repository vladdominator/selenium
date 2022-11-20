import {Browser, Builder} from "selenium-webdriver";
import {HomePage} from "../pages/pastebin/HomePage.js";
import {PastePage} from "../pages/pastebin/PastePage.js";
import {PASTEBIN_PAGE} from "../constants/constants.js";

describe('2', () => {
    it('Should test Bring It On task.', async function () {

        const pasteText = 'git config --global user.name  "New Sheriff in Town"\n' +
            'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")\n' +
            'git push origin master --force';

        const pasteTitle = 'how to gain dominance among developers';
        const pasteExpirationValue = "10 Minutes";
        const pasteSyntaxHighlighting = "Bash";

        const driver = await new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().window().maximize();

        try {
            const homePage = new HomePage(driver);
            await homePage.openPage(PASTEBIN_PAGE);
            await homePage.fillPasteText(pasteText);
            await homePage.fillSyntaxHighlighting(pasteSyntaxHighlighting);
            await homePage.fillPasteExpiration(pasteExpirationValue);
            await homePage.fillPasteTitle(pasteTitle);
            await homePage.createPaste();

            const pastePage = new PastePage(driver);
            await pastePage.checkPageHeading(pasteTitle);
            await pastePage.checkPasteHighlighting(pasteSyntaxHighlighting);
            await pastePage.checkPasteText('jj');
        } finally {
            await driver.quit();
        }
    }).timeout(20000);
})
