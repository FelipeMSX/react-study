import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export const reactConfig = tseslint.config(
    jsxA11Y.flatConfigs.recommended,
    reactHooks.configs["recommended-latest"],
    // Configuration for React files
    {
        ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/build/**"],

        files: ["**/*.tsx", "**/*.jsx"],
        plugins: {
            react,
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
                projectService: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-sort-props": "off",
            "jsx-a11y/interactive-supports-focus": "warn",
        },
    },
);
