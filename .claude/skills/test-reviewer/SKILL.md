---
name: test-reviewer
description: використовуй цей скіл для оцінки якості тестів і використаних локаторів, css selectors і xpath. Use when asked to review a Playwright spec, judge locator/selector quality, or suggest more resilient locators.
---

# Test reviewer: locator & test-quality audit

Review a Playwright spec (or a single locator) and report whether it uses the
**most resilient locator available on the page**. When a lower-priority locator
(CSS/XPath) is used where a higher-priority one exists, flag it and give the
concrete replacement.

This repo drives the live site `https://coffee-cart.app`, so verify replacements
against the real DOM — don't guess. `playwright.config.ts` sets
`testIdAttribute: 'data-test'`, so `getByTestId('Espresso')` maps to
`[data-test="Espresso"]` (drink ids use underscores for spaces, e.g. `Flat_White`).

## How to review

1. Read the spec(s) under `tests/`.
2. For every locator, classify its priority (table below).
3. For anything at priority 6–7 (CSS/XPath) — or a brittle higher-tier locator —
   open the page and check whether a higher-priority locator resolves the same
   element. Use the runner from the `run-coffee-cart-tests` skill to inspect the
   live DOM:
   ```bash
   node .claude/skills/run-coffee-cart-tests/driver.mjs screenshot --out=driver-out
   ```
4. Report findings (see Output).

## Locator priority (highest → lowest)

Prefer user-facing, accessibility-first locators. Drop to a lower tier only when
no higher one resolves the element uniquely.

| # | Locator | Use for |
|---|---------|---------|
| 1 | `page.getByRole()` | Explicit/implicit accessibility role + name (buttons, links, headings, inputs). **Default choice.** |
| 2 | `page.getByText()` | Non-interactive text content. |
| 3 | `page.getByLabel()` | Form controls, by their associated `<label>` text. |
| 4 | `page.getByPlaceholder()` | Inputs without a label, by placeholder. |
| 5 | `page.getByAltText()` | Images, by their `alt` text. |
| 6 | `page.getByTitle()` | Elements with a `title` attribute. |
| 7 | `page.getByTestId()` | Elements tagged with `data-test` (this repo's attribute). Stable but not user-facing — use when nothing above fits. |
| 8 | CSS selectors (`page.locator('.class')`) | Last resort before XPath. Brittle: breaks on markup/styling changes. |
| 9 | XPath (`page.locator('//div[...]')`) | Avoid. Most brittle; breaks on any structural change. |

## What to flag

- **CSS/XPath where an accessible locator exists** — the main thing this skill
  catches. Replace with the highest-priority locator that resolves the element.
- **Brittle selectors** — nth-child chains, deep descendant paths, auto-generated
  class names, absolute XPath.
- **Non-unique locators** — a locator matching multiple elements (suggest scoping
  with `.filter()`, `.getByRole(..., { name })`, or a parent locator).
- **Hard waits** — `page.waitForTimeout(...)`. Playwright locators auto-wait;
  recommend web-first assertions (`await expect(locator).toBeVisible()`) instead.
- **Weak assertions** — a test that acts but never asserts, or asserts on
  incidental detail instead of the user-visible outcome.
- **Non-retrying checks** — `expect(await locator.textContent()).toBe(...)`
  instead of the auto-retrying `await expect(locator).toHaveText(...)`.

## Output

For each issue report: file + line, current locator, its priority tier, why it's
weak, and the recommended replacement (verified against the page). Order findings
worst-first (XPath/CSS before minor nits). If a spec is already using
priority-1/2 locators well, say so — don't invent problems.

## Examples

Good — user-facing, resilient:

```typescript
await page.getByLabel('Password').fill('secret-password');
await page.getByRole('button', { name: 'Sign in' }).click();
await expect(page.getByText('Welcome, John!')).toBeVisible();
```

Flag → suggest:

```typescript
// ❌ CSS, brittle — breaks if the class or markup changes
await page.locator('div.pay-container > button.btn').click();
// ✅ role + accessible name
await page.getByRole('button', { name: 'Total: $26.00' }).click();

// ❌ XPath, worst tier
await page.locator('//ul/li[3]//button').click();
// ✅ this repo exposes data-test; drink names use underscores
await page.getByTestId('Flat_White').click();
```
