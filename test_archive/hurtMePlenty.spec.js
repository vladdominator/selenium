import {Browser, Builder} from "selenium-webdriver";
import {ResultsPage} from "../archive/pages/google-cloud/ResultsPage.js";
import {CalculatorPage} from "../archive/pages/google-cloud/CalculatorPage.js";
import {MailPage} from "../archive/pages/google-cloud/MailPage.js";
import {HomePage} from "../archive/pages/google-cloud/HomePage.js";

describe('3', () => {
    it('Should test Hurt Me Plenty task.', async function () {
        const pageUrl = 'https://cloud.google.com';
        const mailPageUrl = 'https://yopmail.com/ru/email-generator'
        const searchValue = 'Google Cloud Platform Pricing Calculator';
        const searchResultTitle = 'Google Cloud Pricing Calculator';
        const amountOfInstances = 4;
        const bootDistSize = 375;
        const instanceType = 'e2-standard-32 (vCPUs: 32, RAM: 128GB)';
        const datacenterLocation = 'Frankfurt (europe-west3)';
        const totalCost = '285.61';

        const driver = await new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().window().maximize();


            const homePage = new HomePage(driver);
            await homePage.openPage(pageUrl);
            await homePage.inputSearchValue(searchValue);

            const searchResultPage = new ResultsPage(driver);
            await searchResultPage.chooseSearchResult(searchResultTitle);

            const calculatorPage = new CalculatorPage(driver);
            await calculatorPage.goInFrames();
            await calculatorPage.inputAmountOfInstances(amountOfInstances);
            await calculatorPage.inputInstanceType(instanceType);
            await calculatorPage.inputBootDiskSize(bootDistSize);
            // await calculatorPage.inputDatacenterLocation(datacenterLocation);
            await calculatorPage.inputCommittedUsage();
            await calculatorPage.addToEstimate();
            await calculatorPage.moveOutOfFrame();

            const mailPage = new MailPage(driver);
            await mailPage.openPage(mailPageUrl);
            await mailPage.generateRandomEmail();
            await mailPage.switchToPreviousTab();

            await calculatorPage.goInFrames();
            await calculatorPage.openEmailForm();
            await calculatorPage.fillEstimateEmail(mailPage.email);
            await calculatorPage.submitEmailForm();
            await calculatorPage.moveOutOfFrame();

            await mailPage.switchToEmailTab();
            await mailPage.waitForEmail();
            await mailPage.openInboxes();
            await mailPage.moveInFrame();
            await mailPage.checkTotalSum(totalCost)

    }).timeout(50000);
})
