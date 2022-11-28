import {BasePage} from "./BasePage.js";

class ProductPage extends BasePage {
    constructor(driver, size) {
        super(driver);
        this.size = size;
    }

    async hasProductOptions() {
        try {
            await this.findByXpath(`//*[@id='product-options-wrapper']`);

            return true;
        } catch (e) {
            return false;
        }
    }

    async chooseSize(existsSize) {
        if (!existsSize) return this;
        const element = await this.findByXpath(`//*[@class='swatch-attribute-options clearfix']/div[text()='${this.size}']`);
        await element.click();

        return this;
    }

    async addToBasket() {
        const element = await this.findByXpath(`//*[@id='product-addtocart-button']`);
        await element.click();

        return this;
    }

    async hasSuccessMessage() {
        const element = await this.findByClass('message-success');

        return !!element;
    }

    async hasUpdateCountIcon() {
        await this.findByXpath(`//*[@class='minicart-wrapper']//*[@class='counter-number' and text()='1']`);

        return this;
    }
}

export {ProductPage};
