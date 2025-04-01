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
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },
]);
