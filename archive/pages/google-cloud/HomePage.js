import {Key, By} from "selenium-webdriver";

class HomePage {
    constructor(driver) {
        this.driver = driver;
    }

    async openPage(url) {
        await this.driver.get(url);

        return this;
    }

    async inputSearchValue(text) {
        await this.driver.findElement(By.css('.devsite-search-field')).setAttribute('value', value);

        return this;
    }
}

export {HomePage};
