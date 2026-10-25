import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly cartLocator: Locator;
  readonly inventoryItemLocator: Locator;
  readonly inventoryNameLocator: Locator;
  readonly checkoutButtonLocator: Locator;
  readonly continueShopingButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLocator = page.getByTestId("shopping-cart-link");
    this.inventoryItemLocator = page.getByTestId("inventory-item");
    this.inventoryNameLocator = page.getByTestId("inventory-item-name");
    this.checkoutButtonLocator = page.getByTestId("checkout");
    this.continueShopingButtonLocator = page.getByTestId("continue-shopping");
  }

  async gotoCartPage() {
    await this.cartLocator.click();
  }

  private getProductByTitle(title: string) {
    return this.inventoryItemLocator.filter({
      has: this.inventoryNameLocator.getByText(title, { exact: true }),
    });
  }

  async removeFromCartByTitle(title: string) {
    const product = this.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async getPriceByTitle(title: string) {
    const product = this.getProductByTitle(title);
    const price = await product.getByTestId("inventory-item-price").innerText();
    return price;
  }

  async checkout() {
    await this.checkoutButtonLocator.click();
  }

  async continueShopping() {
    await this.continueShopingButtonLocator.click();
  }
}
