# Swag Labs E2E

Автоматизовані E2E-тести для демо-магазину [Swag Labs](https://www.saucedemo.com/) на [Playwright](https://playwright.dev/) (TypeScript).

## Структура проєкту

```
Swag labs/
├── app/pages/          # Page Object-класи для сторінок застосунку
├── tests/
│   ├── swag-labs.spec.ts   # Тест-кейси
│   └── test.data.ts        # Тестові дані користувача та товарів
├── playwright.config.ts    # Конфігурація Playwright
├── .env                    # Облікові дані (не комітити)
└── package.json
```

## Вимоги

- [Node.js](https://nodejs.org/) 18 або новіший
- npm

## Встановлення

```bash
npm install
npx playwright install chromium
```

## Налаштування облікових даних

Створіть файл `.env` в корені проєкту та вкажіть логін і пароль користувача:

```env
LOGIN
PWD
```

## Запуск тестів

Запустити всі тести:

```bash
npx playwright test
```

Запустити тільки смоук-тести:

```bash
npx playwright test --grep @smoke
```

Запустити конкретний тест за ID:

```bash
npx playwright test --grep "SL-003"
```

Запустити з видимим браузером:

```bash
npx playwright test --headed
```

## Звіти

Після запуску HTML-звіт формується в папці `playwright-report/`. Відкрити його можна командою:

```bash
npx playwright show-report
```

Трасування для невдалих тестів зберігаються в `test-results/`.

## Додавання нових тестів

1. Додайте або оновіть Page Object у `app/pages/`, локатори `data-test` в пріорітеті (у конфігурації встановлено `testIdAttribute: "data-test"`).
2. Додайте тест і вкажіть теги `@smoke`, `@login` або `@regression` за потреби.
3. Дані для тестів зберігайте в папці з тестами.
