import jsoncPlugin from "eslint-plugin-jsonc";
import * as prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export const jsonConfig = tseslint.config(...jsoncPlugin.configs["flat/recommended-with-jsonc"], {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/build/**"],

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
});
