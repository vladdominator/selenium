import {By, until} from "selenium-webdriver";
import {DEFAULT_TIME_WAIT} from "../constants/constants.js";

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async openPage(url) {
        await this.driver.get(url);

        return this;
    }

    async findByXpath(xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath)), DEFAULT_TIME_WAIT)
    }

    async findByClass(className) {
        return this.driver.wait(until.elementLocated(By.className(className)), DEFAULT_TIME_WAIT);
    }
}

export {BasePage, DEFAULT_TIME_WAIT};
