import {DEFAULT_LOADING_TIME} from "../../constants/constants.js";
import { By, until } from "selenium-webdriver";

class MailPage {
    constructor(driver) {
        this.driver = driver;
        this.email = null;
    }

    async openPage(url) {
        await this.driver.switchTo().newWindow('tab');
        await this.driver.get(url);

        return this;
    }

    async generateRandomEmail() {
        const email = await this.driver.wait(until.elementLocated(By.id('egen')), DEFAULT_LOADING_TIME);
        this.email = await email.getText();

        return this;
    }

    async openInboxes() {
        const css = 'body > div > div.ymaincenter > main > div > div.pagecdr.brounded > div > div > div.nw > button:nth-child(3)';
        await this.driver.wait(until.elementLocated(By.css(css)), DEFAULT_LOADING_TIME);
        await this.driver.findElement(By.css(css)).click();

        return this;
    }

    async waitForEmail() {
        await this.driver.sleep(10000);
    }

    async checkTotalSum(value) {
        const xPath = `//h2[contains(text(), '${value}')]`;
        await this.driver.wait(until.elementLocated(By.xpath(xPath)), DEFAULT_LOADING_TIME);

        return this;
    }

    async switchToPreviousTab() {
        const tabs = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(tabs[0]);

        return this;
    }

    async switchToEmailTab() {
        const tabs = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(tabs[1]);

        return this;
    }

    async moveInFrame() {
        const iframe = await this.driver.findElement(By.id('ifmail'));
        await this.driver.switchTo().frame(iframe);

        return this;
    }
}

export {MailPage};
