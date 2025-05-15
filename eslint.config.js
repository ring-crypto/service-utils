// eslint.config.js
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // Renamed for clarity

export default tseslint.config(
  {
    // Global ignores
    // Explicitly ignore .eslintrc.js if it keeps reappearing or causing issues
    ignores: [
      "dist/**", 
      "coverage/**", 
      "*.config.js", 
      "*.config.mjs", 
      "*.config.cjs", 
      ".eslintrc.js" 
    ],
  },
  {
    // Configuration for TypeScript/JavaScript files in src
    files: ["src/**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Node.js global variables
        ...globals.es2021, // Modern ECMAScript globals
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Or your specific tsconfig for linting
        tsconfigRootDir: import.meta.dirname, // Correctly resolves tsconfig.json path
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Override or add your project-specific rules here
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Apply Prettier recommended rules, but scoped to src files
  {
    ...eslintPluginPrettierRecommended,
    files: ["src/**/*.{js,mjs,cjs,ts,tsx}"], // Explicitly scope Prettier to src files
  }
); 