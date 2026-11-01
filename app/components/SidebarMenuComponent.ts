import { BaseComponent } from "./BaseComponent";
import { Page, Locator } from "@playwright/test";

export class SidebarMenuComponent extends BaseComponent {
  readonly sidebarMenuLocator: Locator;
  readonly resetLinkLocator: Locator;
  readonly logoutLinkLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarMenuLocator = page.getByRole("button", {name: "Open Menu"});
    this.resetLinkLocator = page.getByTestId("reset-sidebar-link");
    this.logoutLinkLocator = page.getByTestId("logout-sidebar-link");
  }

  async opensidebarMenu() {
    await this.sidebarMenuLocator.click();
  }

  async resetAppState() {
    await this.resetLinkLocator.click();
  }

  async logoutUser() {
    await this.logoutLinkLocator.click();
  }

  async cleanup() {
    await this.opensidebarMenu();
    await this.resetAppState();
    await this.logoutUser();
  }
}
