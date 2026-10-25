import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly inventoryListLocator: Locator;
  readonly inventoryItemLocator: Locator;
  readonly inventoryNameLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryListLocator = page.getByTestId("inventory-list");
    this.inventoryItemLocator = page.getByTestId("inventory-item");
    this.inventoryNameLocator = page.getByTestId("inventory-item-name");
  }

  private getProductByTitle(title: string) {
    return this.inventoryItemLocator.filter({
      has: this.inventoryNameLocator.getByText(title, { exact: true }),
    });
  }

  async addToCartByTitle(title: string) {
    const product = this.getProductByTitle(title);
    await product.getByRole("button", {name: "Add to cart"}).click();
  }

  async removeFromCartByTitle(title: string) {
    const product = this.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove"}).click();
  }

  async getPriceByTitle(title: string) {
    const product = this.getProductByTitle(title);
    return await product.getByTestId("inventory-item-price").innerText();
  }
}
