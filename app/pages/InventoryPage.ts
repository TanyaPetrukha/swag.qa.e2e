import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryComponent } from "../components/InventoryComponent";

export class InventoryPage extends BasePage {
  readonly inventoryListLocator: Locator;
  readonly inventory: InventoryComponent;

  constructor(page: Page) {
    super(page);
    this.inventoryListLocator = page.getByTestId("inventory-list");
    this.inventory = new InventoryComponent(page);
  }

  async addToCartByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    return await product.getByTestId("inventory-item-price").innerText();
  }
}
