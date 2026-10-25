import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepTwoPage extends BasePage {
  readonly itemTotalPriceLocator: Locator;
  readonly taxLocator: Locator;
  readonly totalPriceLocator: Locator;
  readonly finishButtonLocator: Locator;
  readonly cancelButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.itemTotalPriceLocator = page.getByTestId("subtotal-label");
    this.taxLocator = page.getByTestId("tax-label");
    this.totalPriceLocator = page.getByTestId("total-label");
    this.finishButtonLocator = page.getByTestId("finish");
    this.cancelButtonLocator = page.getByTestId("cancel");
  }

  async getItemTotalPrice() {
    const price = await this.itemTotalPriceLocator.innerText();
    return price;
  }

  async getTax() {
    const tax = await this.taxLocator.innerText();
    return tax;
  }

  async getTotalPrice() {
    const price = await this.totalPriceLocator.innerText();
    return price;
  }
  async finish() {
    await this.finishButtonLocator.click();
  }
}
