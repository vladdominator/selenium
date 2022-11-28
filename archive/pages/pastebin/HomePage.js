import {By} from "selenium-webdriver";

class HomePage {
    constructor(driver) {
        this.driver = driver;
    }

    async openPage(url) {
        await this.driver.get(url);

        return this;
    }

    async fillPasteText(text) {
        await this.driver.findElement(By.id('postform-text')).sendKeys(text);

        return this;
    }

    async fillSyntaxHighlighting(value) {
        await this.driver.findElement(By.id('select2-postform-format-container')).click();
        await this.driver.findElement(By.xpath(`//*[@id='select2-postform-format-results']/li/ul/li[text()='${value}']`)).click();

        return this;
    }

    async fillPasteExpiration(value) {
        await this.driver.findElement(By.id('select2-postform-expiration-container')).click();
        await this.driver.findElement(By.xpath(`//*[@id='select2-postform-expiration-results']/li[text()='${value}']`)).click();

        return this;
    }

    async fillPasteTitle(text) {
        await this.driver.findElement(By.id('postform-name')).sendKeys(text);

        return this;
    }

    async createPaste() {
        await this.driver.findElement(By.xpath('//*[@id="w0"]/div[5]/div[1]/div[10]/button')).click();

        return this;
    }
}

export {HomePage};
