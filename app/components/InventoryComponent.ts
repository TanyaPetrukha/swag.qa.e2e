import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class InventoryComponent extends BaseComponent {
  readonly inventoryItemLocator: Locator;
  readonly inventoryNameLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItemLocator = page.getByTestId("inventory-item");
    this.inventoryNameLocator = page.getByTestId("inventory-item-name");
  }

  async getProductByTitle(title: string) {
    return this.inventoryItemLocator.filter({
      has: this.inventoryNameLocator.getByText(title, { exact: true }),
    });
  }
}