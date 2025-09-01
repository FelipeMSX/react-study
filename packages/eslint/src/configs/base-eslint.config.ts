import * as eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export const baseConfig = tseslint.config(
    // Base recommended configs
    eslint.configs.recommended,
    tseslint.configs.recommended,
    // Configuration for TypeScript and JavaScript files (non-React)
    {
        ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/build/**"],
        files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                projectService: true,
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
        },
    },
);
