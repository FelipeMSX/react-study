import * as eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { ignoredFolders } from "../shared";

export const baseConfig = defineConfig([
    ignoredFolders,
    {
        files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
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
]);
