import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly pageTitleLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleLocator = page.getByTestId("title");
  }
}
