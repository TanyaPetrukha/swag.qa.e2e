import { test, expect } from "../fixtures/fixtures";
import { products, userStandard, userLockedOut } from "./swag-labs.data";

test(
  "SL-001-01 Успішний вхід і відображення каталогу",
  { tag: ["@smoke", "@login"] },
  async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryListLocator).toBeVisible();
  },
);

test.describe(() => {
  test.use({ userToLogin: userLockedOut, loginShouldSucceed: false });
  test(
    "SL-001-02 Блокування входу для юзерів ",
    { tag: ["@smoke", "@login"] },
    async ({ page }) => {
      await expect(page.getByTestId("error")).toBeVisible();
    },
  );
});

for (const product of products) {
  test(
    `SL-002-${product.id} Додавання товару та перевірка його ціни в кошику`,
    { tag: ["@smoke", "@regression"] },
    async ({ inventoryPage, cartPage }) => {
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
  async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    await expect(inventoryPage.inventoryListLocator).toBeVisible();
    await inventoryPage.addToCartByTitle(products[0].name);

    await cartPage.gotoCartPage();
    await cartPage.checkout();

    await checkoutStepOnePage.fillFirstName(userStandard.firstName);
    await checkoutStepOnePage.fillLastName(userStandard.lastName);
    await checkoutStepOnePage.fillZipCode(userStandard.zipCode);
    await checkoutStepOnePage.continue();

    await checkoutStepTwoPage.finish();

    expect(page.getByTestId("complete-header")).toBeVisible();
  },
);
