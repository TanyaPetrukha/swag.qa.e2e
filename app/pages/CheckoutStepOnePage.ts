import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOnePage extends BasePage {
  readonly firstNameLocator: Locator;
  readonly lastNameLocator: Locator;
  readonly zipCodeLocator: Locator;
  readonly continueButtonLocator: Locator;
  readonly cancelButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameLocator = page.getByTestId("firstName");
    this.lastNameLocator = page.getByTestId("lastName");
    this.zipCodeLocator = page.getByTestId("postalCode");
    this.continueButtonLocator = page.getByTestId("continue");
    this.cancelButtonLocator = page.getByTestId("cancel");
  }

  async fillFirstName(firstName: string) {
    await this.firstNameLocator.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameLocator.fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.zipCodeLocator.fill(zipCode);
  }

  async continue() {
    await this.continueButtonLocator.click();
  }
}
