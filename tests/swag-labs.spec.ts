import { test, expect } from "@playwright/test";
import { products, user } from "./test.data";
import { LoginPage } from "../app/pages/LoginPage";
import { InventoryPage } from "../app/pages/InventoryPage";
import { CartPage } from "../app/pages/CartPage";
import { CheckoutStepOnePage } from "../app/pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../app/pages/CheckoutStepTwoPage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;

test.beforeEach(async ({ page }) => {
  page.goto("");
  console.log(user);
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutStepOnePage = new CheckoutStepOnePage(page);
  checkoutStepTwoPage = new CheckoutStepTwoPage(page);
});

test(
  "SL-001 Успішний вхід і відображення каталогу",
  { tag: ["@smoke", "@login"] },
  async ({ page }) => {
    await loginPage.loginUser(user.loginData);
    await expect(inventoryPage.inventoryListLocator).toBeVisible();
  },
);

for (const product of products) {
  test(
    `SL-002-${product.id} Додавання товару та перевірка його ціни в кошику`,
    { tag: ["@smoke", "@regression"] },
    async ({ page }) => {
      await loginPage.loginUser(user.loginData);
      await expect(inventoryPage.inventoryListLocator).toBeVisible();
      await inventoryPage.addToCartByTitle(product.name);
      await cartPage.gotoCartPage();
      const priceInCart = await cartPage.getPriceByTitle(product.name);
      expect(product.price).toEqual(priceInCart);
    },
  );
}

test(
  "SL-003 Оформлення замовлення з перевіркою результату",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await loginPage.loginUser(user.loginData);

    await expect(inventoryPage.inventoryListLocator).toBeVisible();
    await inventoryPage.addToCartByTitle(products[0].name);

    await cartPage.gotoCartPage();
    await cartPage.checkout();

    await checkoutStepOnePage.fillFirstName(user.firstName);
    await checkoutStepOnePage.fillLastName(user.lastName);
    await checkoutStepOnePage.fillZipCode(user.zipCode);
    await checkoutStepOnePage.continue();

    await checkoutStepTwoPage.finish();

    expect(page.getByTestId("complete-header")).toBeVisible();
  },
);
