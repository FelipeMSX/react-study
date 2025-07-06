import * as eslint from "@eslint/js";
import * as prettier from "eslint-plugin-prettier";
import * as eslintPluginImport from "eslint-plugin-import";
import * as simpleImportSort from "eslint-plugin-simple-import-sort";
import * as jsxA11Y from "eslint-plugin-jsx-a11y";
import * as reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import jsoncPlugin from "eslint-plugin-jsonc";

export default tseslint.config(
    // Base recommended configs
    eslint.configs.recommended,
    jsxA11Y.flatConfigs.recommended,
    ...tseslint.configs.recommended,
    ...jsoncPlugin.configs["flat/recommended-with-jsonc"],

    // Global ignores
    {
        ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/build/**"],
    },

    // Configuration for TypeScript and JavaScript files (non-React)
    {
        files: ["**/*.ts", "**/*.js"],
        plugins: {
            prettier,
            "import": eslintPluginImport,
            "simple-import-sort": simpleImportSort,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                project: true,
            },
        },
        settings: {
            "import/resolver": {
                typescript: {},
            },
        },
        rules: {
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    semi: true,
                    arrowParens: "always",
                    trailingComma: "all",
                    endOfLine: "auto",
                    tabWidth: 4,
                },
            ],
        },
    },
    // Configuration for React files
    {
        files: ["**/*.tsx", "**/*.jsx"],
        plugins: {
            prettier,
            "import": eslintPluginImport,
            "simple-import-sort": simpleImportSort,
            react,
            "react-hooks": reactHooks,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: true,
                document: true,
                navigator: true,
            },
            parserOptions: {
                project: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            "import/resolver": {
                typescript: {},
            },
            "react": {
                version: "detect",
            },
        },
        rules: {
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    semi: true,
                    arrowParens: "always",
                    trailingComma: "all",
                    endOfLine: "auto",
                    tabWidth: 4,
                },
            ],
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-sort-props": "off",
            "jsx-a11y/interactive-supports-focus": "warn",
            ...reactHooks.configs.recommended.rules,
        },
    },
    // Configuration for JSON/JSONC files
    {
        files: ["**/*.json", "**/*.jsonc"],
        plugins: {
            prettier,
        },
        rules: {
            "prettier/prettier": [
                "error",
                {
                    trailingComma: "all",
                    tabWidth: 4,
                },
            ],
        },
    },
);
