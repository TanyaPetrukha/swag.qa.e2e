import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../app/pages/LoginPage";
import { InventoryPage } from "../../app/pages/InventoryPage";
import { CartPage } from "../../app/pages/CartPage";
import { CheckoutStepOnePage } from "../../app/pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../app/pages/CheckoutStepTwoPage";
import { userStandard } from "../with-fixtures/swag-labs.data";

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  userToLogin: { login: string; password: string };
  login: void;
  loginShouldSucceed: boolean;
};

const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    await use(checkoutStepTwoPage);
  },

  userToLogin: userStandard.loginData,
  
  loginShouldSucceed: true,

  login: [
    async ({ loginPage, userToLogin, loginShouldSucceed }, use) => {
      await loginPage.gotoLoginPage();
      await loginPage.loginUser(userToLogin);

      await use();

      if (loginShouldSucceed) {
        await loginPage.sidebarMenu.cleanup();
      }
    },
    {
      auto: true,
    },
  ],
});

export { test, expect };
