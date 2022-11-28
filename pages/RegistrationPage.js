import {BasePage} from "./BasePage.js";
import {By, Key} from "selenium-webdriver";

class RegistrationPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async fillFirstNameInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='firstname' and @name='firstname']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async fillLastNameInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='lastname' and @name='lastname']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async fillDateBirthdayInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='dob' and @name='dob']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async fillEmailInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='email_address']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async fillPasswordInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='password' and @name='password']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async fillPasswordConfirmationInput(value) {
        this.driver.findElement(By.xpath(`//*[@id='password-confirmation' and @name='password_confirmation']`)).sendKeys(value, Key.ENTER);

        return this;
    }

    async registrateUser() {
        const element = await this.findByClass('button register');
        await element.click();
        return this;
    }
}

export {RegistrationPage};
