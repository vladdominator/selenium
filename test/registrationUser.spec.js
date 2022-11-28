import {Browser, Builder, Capabilities} from "selenium-webdriver";
import {RegistrationPage} from "../pages/RegistrationPage.js";
import {DEFAULT_REGISTRATION_PAGE_URL, MAIL_GENERATOR_PAGE_URL} from "../constants/constants.js";
import {MailPage} from "../archive/pages/google-cloud/MailPage.js";

describe('Registration user.', () => {
    beforeEach(async function () {
        const capabilities = {
            ...Capabilities.chrome(),
        };
        this.driver = await new Builder().usingServer('http://localhost:4000/wd/hub').withCapabilities(capabilities).build();
        await this.driver.manage().window().maximize();
    });

    it('Should correct registration user data.', async function () {
        const firstNameValue = 'Жилинский';
        const lastNameValue = 'Владислав';
        const dayBirthdayValue = '08/01/2003';
        const emailValue = 'KDKD@dd.ru';
        const passwordValue = "Vs793888..";

        const registrationPage = new RegistrationPage(this.driver);
        await registrationPage.openPage(DEFAULT_REGISTRATION_PAGE_URL);

        await this.driver.executeScript("window.localStorage.clear();");
        await this.driver.executeScript("window.sessionStorage.clear();");

        const mailPage = new MailPage(this.driver);
        await mailPage.openPage(MAIL_GENERATOR_PAGE_URL);
        await mailPage.generateRandomEmail();
        await mailPage.switchToPreviousTab();

        await this.driver.sleep(1000);

        await registrationPage.fillFirstNameInput(firstNameValue);
        await registrationPage.fillLastNameInput(lastNameValue);
        await registrationPage.fillDateBirthdayInput(dayBirthdayValue);
        await registrationPage.fillEmailInput(mailPage.email);
        await registrationPage.fillPasswordInput(passwordValue);
        await registrationPage.fillPasswordConfirmationInput(passwordValue);
        // await registrationPage.registrateUser();

        await this.driver.sleep(8000);

    }).timeout(20000);

    afterEach(async function () {
        await this.driver.quit();
    })
})
