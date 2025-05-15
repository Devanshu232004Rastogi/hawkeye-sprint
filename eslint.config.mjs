import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules, // ✅ Correct usage
      "react/react-in-jsx-scope": "off", // ✅ For React 17+
      "react/prop-types": "off", // ✅ Not needed with TypeScript
      ...nextPlugin.configs.recommended.rules, // ✅ Next.js recommended rules
    },
  },

  // TypeScript configuration
  ...tseslint.configs.recommended,
]);
