# React + TypeScript + Vite + Jest

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Sentry Error Tracking Verification

This project has Sentry integrated for error monitoring and tracking. To verify that Sentry is working correctly:

### How to Test Sentry

1. Visit the deployed application at: https://todo-list-4e562.web.app
2. On the login page, you will find a button labeled "Test Sentry Error Tracking"
3. Click the button to send a test error to Sentry
4. After logging in, the same button is available in the todos page (top right corner)
5. Wait approximately 1 minute for the error to appear in the Sentry dashboard

### Viewing Errors in Sentry

1. Go to https://sentry.io and log in
2. Navigate to the Issues section
3. You should see the captured errors with:
   - Complete stack trace
   - Browser and environment information
   - Timestamp of when the error occurred
   - User context and session data

### What is Captured

- All JavaScript errors and exceptions
- React component errors via Error Boundary
- Performance metrics and transaction traces
- Session replays when errors occur
- Custom error messages sent via the test button

### Technical Implementation

- Sentry SDK initialized in `src/main.tsx`
- Error Boundary configured in `src/App.tsx`
- Source maps enabled for production builds
- Environment variables configured in CI/CD pipeline

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
