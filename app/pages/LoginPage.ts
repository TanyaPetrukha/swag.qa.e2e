import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly usernameFieldLocator: Locator;
  readonly passwordFieldLocator: Locator;
  readonly loginButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameFieldLocator = page.getByTestId("username");
    this.passwordFieldLocator = page.getByTestId("password");
    this.loginButtonLocator = page.getByTestId("login-button");
  }

  async loginUser(userData: { login: string; password: string }) {
    await this.usernameFieldLocator.fill(userData.login);
    await this.passwordFieldLocator.fill(userData.password);
    await this.loginButtonLocator.click();
  }
}
