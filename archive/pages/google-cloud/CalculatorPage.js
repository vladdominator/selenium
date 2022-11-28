import {By, until} from "selenium-webdriver";
import {DEFAULT_LOADING_TIME} from "../../constants/constants.js";

class CalculatorPage {
    constructor(driver) {
        this.driver = driver;
    }

    async openFrame() {
        const iframe = await this.driver.findElement(By.tagName('iframe'));
        await this.driver.switchTo().frame(iframe);

        return this;
    }

    async goInFrames() {
        await this.driver.wait(until.elementLocated(By.tagName('iframe')), DEFAULT_LOADING_TIME);
        await this.openFrame();
        await this.openFrame();

        return this;
    }

    async moveOutOfFrame() {
        await this.driver.switchTo().defaultContent();
    }

    async inputAmountOfInstances(value) {
        await this.driver.findElement(By.id("input_90")).sendKeys(value);

        return this;
    }

    async inputInstanceType(value) {
        await this.driver.findElement(By.id('select_117')).click();
        await this.driver.findElement(By.xpath(`//md-option[@id='select_option_267']`)).click();

        return this;
    }

    async inputBootDiskSize(value) {
        await this.driver.findElement(By.id("input_121")).sendKeys(value);

        return this;
    }

    async inputCommittedUsage() {
        await this.driver.findElement(By.id('select_130')).click();
        await this.driver.findElement(By.xpath(`//md-option[@id='select_option_128']`)).click();

        return this;
    }

    async inputDatacenterLocation(text) {
        await this.driver.findElement(By.id('select_123')).click();
        await this.driver.findElement(By.xpath(`//md-option[@id='select_option_228']/div[contains(text(), '${text}')]`)).click();

        return this;
    }

    async addToEstimate() {
        await this.driver.findElement(By.xpath("//button[@aria-label='Add to Estimate']")).click();

        return this;
    }

    async checkTotalCost(value) {
        await this.driver.wait(until.elementLocated(By.css('#resultBlock > md-card > md-card-content > div > div > div > h2 > b')), DEFAULT_LOADING_TIME);
        const element = await this.driver.findElement(By.xpath(`//*[@id='resultBlock']/md-card/md-card-content/div/div/div/h2/b[contains(text(), '${value}')]`))
        const text = await element.getText();

        return this;
    }

    async openEmailForm() {
        await this.driver.wait(until.elementLocated(By.id('email_quote')), DEFAULT_LOADING_TIME);
        await this.driver.findElement(By.id('email_quote')).click();

        return this;
    }

    async fillEstimateEmail(email) {
        await this.driver.wait(until.elementLocated(By.id(`//input[@type='email']`)), DEFAULT_LOADING_TIME);
        await this.driver.findElement(By.id('input_466')).sendKeys(email);

        return this;
    }

    async submitEmailForm() {
        await this.driver.wait(until.elementLocated(By.xpath('//*[@id="dialogContent_558"]/form/md-dialog-actions/button[2]')), DEFAULT_LOADING_TIME);
        await this.driver.findElement(By.xpath('//*[@id="dialogContent_558"]/form/md-dialog-actions/button[2]')).click();

        return this;
    }
}

export {CalculatorPage};
