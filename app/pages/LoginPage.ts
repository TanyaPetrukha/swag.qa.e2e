import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";
import { SidebarMenuComponent } from "../components/SidebarMenuComponent";

export class LoginPage extends BasePage {
  readonly usernameFieldLocator: Locator;
  readonly passwordFieldLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly sidebarMenu: SidebarMenuComponent;

  constructor(page: Page) {
    super(page);
    this.usernameFieldLocator = page.getByTestId("username");
    this.passwordFieldLocator = page.getByTestId("password");
    this.loginButtonLocator = page.getByTestId("login-button");
    this.sidebarMenu = new SidebarMenuComponent(page);
  }

  async gotoLoginPage() {
    await this.page.goto("");
  }

  async loginUser(userData: { login: string; password: string }) {
    await this.usernameFieldLocator.fill(userData.login);
    await this.passwordFieldLocator.fill(userData.password);
    await this.loginButtonLocator.click();
  }
}
