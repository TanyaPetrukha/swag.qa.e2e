---
name: page-object
description: Use this skill when writing or changing Playwright tests in this repo and you need to reuse existing page objects (methods, locators, components) or create a new page object with locators and methods to interact with a page. Triggers - "create page object", "add page", "new POM", "add locator/method to a page", "write a test for <page>", "створи page object", "додай сторінку", "додай локатор/метод".
---

if you need to investigate pages use skill

# Page Object: reuse first, then create by the template

This repo (Swag Labs, `https://www.saucedemo.com/`) keeps all UI interaction in
page objects under `app/`. Specs in `tests/` only call page-object methods and
assert — they never build locators themselves.

The canonical template for any new page object lives in
[references/examples/](references/examples/):

- [ExamplePageLocators.md](references/examples/ExamplePageLocators.md) — locator class
- [ExamplePage.md](references/examples/ExamplePage.md) — page class that composes the locators and components

Read both files before writing a new page object and copy their structure.

## Project layout

```
app/
  components/
    BaseComponent.ts          # base for reusable widgets (holds `page`)
    ProductItemComponent.ts   # getProductByTitle(title) → Locator of one product card
  pages/
    BasePage.ts               # base for pages (holds `page`, `pageTitleLocator`)
    BaseLocator.ts            # base for locator classes (holds `page`, `pageTitleLocator`)
    CartPage/                 # ← reference implementation of the template
      CartPage.ts
      CartPageLocators.ts
    LoginPage.ts              # older style: locators assigned in constructor
    InventoryPage.ts
    CheckoutStepOnePage.ts
    CheckoutStepTwoPage.ts
tests/
  swag-labs.spec.ts
  swag-labs.data.ts           # test data (users, products)
```

`playwright.config.ts` sets `testIdAttribute: 'data-test'`, so
`getByTestId('checkout')` resolves `[data-test="checkout"]`.

## Workflow

### 1. Look for something to reuse

Before writing anything, read the existing classes in `app/pages/` and
`app/components/`. Reuse when possible:

| Need                               | Already exists                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| Log in                             | `LoginPage.loginUser({ login, password })`                                                          |
| Find a product card by name        | `ProductItemComponent.getProductByTitle(title)`                                                     |
| Add / remove product on inventory  | `InventoryPage.addToCartByTitle`, `removeFromCartByTitle`, `getPriceByTitle`                        |
| Open cart, checkout, remove, price | `CartPage.gotoCartPage`, `checkout`, `continueShopping`, `removeFromCartByTitle`, `getPriceByTitle` |
| Checkout form                      | `CheckoutStepOnePage.fillFirstName / fillLastName / fillZipCode / continue`                         |
| Overview totals, finish            | `CheckoutStepTwoPage.getItemTotalPrice / getTax / getTotalPrice / finish`                           |
| Page heading                       | `pageTitleLocator` on every page (from `BasePage`)                                                  |

Decide:

- **Method exists** → use it in the spec.
- **Page exists, method/locator missing** → add it to that page (and to its
  `*Locators` class if the page has one).
- **Element repeats across pages** (product card, header, menu) → put it in a
  component in `app/components/` extending `BaseComponent`.
- **Page does not exist** → create a new one by the template (step 2).

### 2. Create a new page object by the template

For a page `Xxx`, create a folder `app/pages/XxxPage/` with two files.

**`XxxPageLocators.ts`** — follows [ExamplePageLocators.md](references/examples/ExamplePageLocators.md):

Rules:

- Extend `BaseLocator`; do **not** write a constructor — fields are initialized
  inline from `this.page`.
- Static elements → `readonly <name>Locator: Locator = this.page.getBy...(...)`.
- Elements inside a dynamic parent (product card, table row) → arrow function
  `get<Name>LocatorBy<Parent> = (parent: Locator) => parent.getBy...(...)`.
- Only locators here — no clicks, no `await`, no assertions.

**`XxxPage.ts`** — follows [ExamplePage.md](references/examples/ExamplePage.md):

Rules:

- Extend `BasePage`; compose (not inherit) the locator class as `locators` and
  components as fields — no constructor needed.
- One public `async` method per user action, named by intent:
  `checkout()`, `gotoCartPage()`, `removeFromCartByTitle(title)`.
- Read methods return values (`innerText()`), they don't assert:
  `getPriceByTitle(title)`, `getTotalPrice()`.
- Dynamic items: get the parent via a component
  (`inventory.getProductByTitle`), then pass it to a `get...LocatorBy...` function.
- Make sure each method uses the locator that matches its name
  (`getPriceByTitle` → `getPriceLocatorByProduct`).

### 3. Choose locators

Pick the most resilient locator that uniquely matches the element:

1. `getByRole(role, { name })` — buttons, links, inputs, headings
2. `getByText` / `getByLabel` / `getByPlaceholder` / `getByAltText`
3. `getByTestId('...')` — `data-test` attributes; widely available on Swag Labs
4. CSS — last resort; never XPath

Verify the locator against the live page when unsure (see the `playwright-cli`
skill) rather than guessing `data-test` values.

### 4. Naming

| Kind                  | Convention                                  | Example                        |
| --------------------- | ------------------------------------------- | ------------------------------ |
| Page class / file     | `XxxPage` in `app/pages/XxxPage/XxxPage.ts` | `CartPage`                     |
| Locator class / file  | `XxxPageLocator` in `XxxPageLocators.ts`    | `CartPageLocator`              |
| Locator field         | camelCase + `Locator` suffix                | `checkoutButtonLocator`        |
| Scoped locator getter | `get<Element>LocatorBy<Parent>`             | `getRemoveLocatorByProduct`    |
| Action method         | verb, by intent                             | `checkout`, `continueShopping` |
| Read method           | `get<Value>` / `get<Value>By<Key>`          | `getPriceByTitle`              |

Variables holding a `Locator` always end with `Locator` (see `.claude/rules/variables.md`).

### 5. Use it in the spec

Instantiate in `beforeEach` alongside the others in `tests/swag-labs.spec.ts`
and keep assertions in the test:

```typescript
let xxxPage: XxxPage;

test.beforeEach(async ({ page }) => {
  xxxPage = new XxxPage(page);
});

test('...', async () => {
  await xxxPage.submit();
  await expect(xxxPage.locators.pageTitleLocator).toHaveText('...');
});
```

Use web-first assertions (`await expect(locator).toBeVisible()`) and always
`await` them.

### 6. Verify

```bash
npx playwright test --list          # specs load, imports resolve
npx playwright test -g "<test name>" # run the affected test
```

Requires `.env` with `LOGIN` and `PWD` (e.g. `standard_user` / `secret_sauce`).

## Checklist

- [ ] Searched existing pages/components and reused what exists
- [ ] New page lives in `app/pages/XxxPage/` with `XxxPage.ts` + `XxxPageLocators.ts`
- [ ] Locator class extends `BaseLocator`, page extends `BasePage`, composed via `locators`
- [ ] All locator names end with `Locator`; scoped ones are `get...LocatorBy...` arrow functions
- [ ] No assertions or `waitForTimeout` inside page objects
- [ ] Each method uses the locator matching its name
- [ ] `npx playwright test --list` passes
