---
paths:
  - 'tests/**'
---

# Variable Naming Rules

## 1. Use Meaningful Names

**Do:** Choose names that clearly describe the variable's purpose. This makes your code more readable and helps other developers (or your future self) understand what each variable represents.

```js
let userAge = 25;
```

**Don't:** Use vague names that don't convey meaning, as they can make your code harder to read and maintain.

```js
let x = 25;
```

## 2. Use Camel Case

**Do:** Start variable names with a lowercase letter and capitalize the first letter of each subsequent word. This is a widely accepted convention in JavaScript.

```js
let totalAmount = 100;
```

**Don't:** Use underscores or spaces, which can make your code less consistent with common JavaScript practices.

```js
let total_amount = 100; // or
let total amount = 100;
```

## 3. Start with a Letter or Underscore

**Do:** Start variable names with a letter or an underscore to ensure compatibility with JavaScript's naming rules.

```js
let _count = 10;
```

**Don't:** Start with a number or special characters, which are not allowed in variable names.

```js
let 1stPlace = "Gold"; // or
let @score = 10;
```

## 4. Avoid Reserved Words

**Do:** Avoid using JavaScript reserved keywords as variable names to prevent conflicts and errors in your code.

```js
let currentScore = 50;
```

**Don't:** Use JavaScript reserved words.

```js
let function = "example";
```

## 5. Use Consistent Naming

**Do:** Maintain a consistent naming convention throughout your code to ensure clarity and avoid confusion.

```js
let userName = 'Alice';
let userEmail = 'alice@example.com';
```

**Don't:** Mix different naming styles, which can lead to inconsistency and make your code harder to follow.

```js
let userName = 'Alice'; // and
let User_Email = 'alice@example.com';
```

## 6. Avoid Single Letters Except for Counters

**Do:** Use descriptive names for variables, except for loop counters where single letters are acceptable.

```js
let index = 0; // for loop counters
let totalPrice = 150;
```

**Don't:** Use single letters for general variables, as they don't provide enough context.

```js
let a = 10; // unless in a loop like for (let i = 0; i < 10; i++)
```

## 7. Be Descriptive with Boolean Variables

**Do:** Use names that clearly imply a true/false value to make the code's intent obvious.

```js
let isLoggedIn = true;
```

**Don't:** Use ambiguous names for boolean variables.

```js
let status = true;
```

## 8. Avoid Special Characters

**Do:** Stick to letters, numbers, and underscores for variable names to ensure they are valid and consistent.

```js
let user_address = '123 Main St';
```

**Don't:** Use special characters like `@`, `$`, or `!`.

```js
let user@address = "123 Main St";
```

## 9. Keep It Short But Clear

**Do:** Use concise names that are still descriptive to ensure your code remains readable and manageable.

```js
let cartItems = [];
```

**Don't:** Use overly long names that can clutter your code.

```js
let theListOfItemsInTheShoppingCart = [];
```

## 10. Use Locator suffix if this variable contains Locator object

**Do:** Use concise names that are still descriptive to ensure your code remains readable and manageable.

```js
const nameInputLocator = page.locator('#name');
```

## Sample Code

Here are some examples demonstrating good practices in variable naming:

```js
// Variable for storing user age
let userAge = 25;

// Variable for total amount of a purchase
let totalAmount = 100.5;

// Boolean indicating if the user is logged in
let isLoggedIn = true;

// Counter for a loop
for (let index = 0; index < 10; index++) {
  console.log(index);
}

// Array to store the names of users
let userNames = ['Alice', 'Bob', 'Charlie'];

// Function to calculate total price with tax
function calculateTotalPrice(price, taxRate) {
  let totalPrice = price + price * taxRate;
  return totalPrice;
}

// Example usage
let price = 50;
let taxRate = 0.07; // 7% tax
let finalPrice = calculateTotalPrice(price, taxRate);

console.log('Final price including tax: $' + finalPrice);
```
