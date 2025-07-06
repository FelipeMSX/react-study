import * as eslint from "@eslint/js";
import * as prettier from "eslint-plugin-prettier";
import * as eslintPluginImport from "eslint-plugin-import";
import * as simpleImportSort from "eslint-plugin-simple-import-sort";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import * as react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
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

    // Configuration for TypeScript files
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json"],
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
            //Typescript specific rules
            "no-console": "warn",
            "no-unused-vars": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            //Typescript specific rules

            //Prettier rules
            "prettier/prettier": [
                "error",
                {
                    "singleQuote": false,
                    "semi": true,
                    "arrowParens": "always",
                    "trailingComma": "all",
                    "endOfLine": "auto",
                    "tabWidth": 4,
                    "no-unused-vars": "off",
                },
            ],
            //Prettier rules

            //React rules
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "error",
            "jsx-a11y/interactive-supports-focus": "warn",
            "react/jsx-sort-props": "off",
            ...reactHooks.configs.recommended.rules,
            //React rules
        },
    },
);
