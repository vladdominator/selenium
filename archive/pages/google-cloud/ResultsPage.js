import { until, By } from "selenium-webdriver";
import {DEFAULT_LOADING_TIME} from "../../constants/constants.js";

class ResultsPage {
    constructor(driver) {
        this.driver = driver;
    }

    async chooseSearchResult(value) {
        const xPath = `//div[@class='gs-title']/a/b[text()='${value}']`;
        await this.driver.wait(until.elementLocated(By.xpath(xPath)), DEFAULT_LOADING_TIME);
        await this.driver.findElement(By.xpath(xPath)).click();

        return this;
    }

}

export {ResultsPage};
