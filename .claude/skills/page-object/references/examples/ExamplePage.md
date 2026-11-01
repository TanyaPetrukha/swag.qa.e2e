# PageObject with page actions file example

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ProductItemComponent } from '../../components/ProductItemComponent';
import { CartPageLocator } from './ExamplePageLocators';

// composition

export class CartPage extends BasePage {
  readonly locators: CartPageLocator = new CartPageLocator(this.page);
  readonly inventory = new ProductItemComponent(this.page);

  async gotoCartPage() {
    await this.locators.cartLocator.click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    await this.locators.getRemoveLocatorByProduct(product).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.inventory.getProductByTitle(title);
    const price = await this.locators
      .getPriceLocatorByProduct(product)
      .innerText();

    return price;
  }

  async checkout() {
    await this.locators.checkoutButtonLocator.click();
  }

  async continueShopping() {
    await this.locators.continueShoppingButtonLocator.click();
  }
}
```
