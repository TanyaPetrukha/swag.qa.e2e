import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryComponent } from "../components/InventoryComponent";

export class CartPage extends BasePage {
  readonly inventory: InventoryComponent;
  readonly cartLocator: Locator;
  readonly checkoutButtonLocator: Locator;
  readonly continueShopingButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.inventory = new InventoryComponent(page);
    this.cartLocator = page.getByTestId("shopping-cart-link");
    this.checkoutButtonLocator = page.getByTestId("checkout");
    this.continueShopingButtonLocator = page.getByTestId("continue-shopping");
  }

  async gotoCartPage() {
    await this.cartLocator.click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
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
