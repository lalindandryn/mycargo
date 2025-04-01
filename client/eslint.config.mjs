import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      tseslint,
      prettier: "eslint-plugin-prettier",
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      "plugin:prettier/recommended",
    ],
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },
]);
