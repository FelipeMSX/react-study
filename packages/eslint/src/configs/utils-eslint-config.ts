import { defineConfig } from "eslint/config";
import * as eslintPluginImport from "eslint-plugin-import";
import * as prettier from "eslint-plugin-prettier";

import { ignoredFolders } from "../shared";

export const utilsConfig = defineConfig([
    ignoredFolders,
    {
        files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
        plugins: {
            prettier,
            import: eslintPluginImport,
        },
        settings: {
            "import/resolver": {
                typescript: {},
            },
        },

        rules: {
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
            // Ordenação de imports
            "import/order": [
                "error",
                {
                    "groups": [
                        ["builtin", "external"], // node e libs externas (fs, react, lodash)
                        ["internal"], // imports com alias do projeto (@/lib/..., etc.)
                        ["parent", "sibling", "index"], // relativos (../, ./, index.ts)
                        ["type"], // imports de tipos
                    ],
                    "pathGroups": [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before", // react sempre primeiro
                        },
                        {
                            pattern: "@/**", // se você usa paths do tsconfig
                            group: "internal",
                        },
                    ],
                    "pathGroupsExcludedImportTypes": ["react"],

                    "newlines-between": "always", // linha em branco entre grupos
                    "alphabetize": { order: "asc", caseInsensitive: true }, // ordenação alfabética dentro do grupo
                },
            ],
        },
    },
]);
