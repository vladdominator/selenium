import {DEFAULT_LOADING_TIME, PASTEBIN_PAGE} from "../../constants/constants.js";
import {By, until} from "selenium-webdriver";

class PastePage {
    constructor(driver) {
        this.driver = driver;
    }

    async checkPageHeading(text) {
        await this.driver.get(`${PASTEBIN_PAGE}/FS2qkEQw`);
        await this.driver.wait(until.elementLocated(By.xpath(`//h1[text()='${text}']`)), DEFAULT_LOADING_TIME);

        return this;
    }

    async checkPasteHighlighting(value) {
        await this.driver.wait(until.elementLocated(By.className(value.toLowerCase())), DEFAULT_LOADING_TIME);

        return this;
    }

    async checkPasteText(pasteText) {
        await this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${pasteText}')]`)), DEFAULT_LOADING_TIME);

        return this;
    }

}

export {PastePage};
