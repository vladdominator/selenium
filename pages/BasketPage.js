import {BasePage} from "./BasePage.js";

class BasketPage extends BasePage {
    constructor(driver, size) {
        super(driver);
        this.size = size;
    }

    async checkCorrectSize() {
        await this.findByXpath(`//*[@class='cart-item']//*[@class='item-options']/dd[text()='${this.size}']`);

        return this;
    }
}

export {BasketPage};
