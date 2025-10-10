// @ts-check
import { defineConfig, globalIgnores } from "eslint/config";

import tseslint from "typescript-eslint";
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import globals from "globals";

export default defineConfig(
    globalIgnores(["dist"]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    reactRefresh.configs.vite,
    stylistic.configs.customize({
        indent: 4,
        semi: true,
        commaDangle: "never"
    }),
    {
        files: ["**/*.tsx"],
        plugins: {
            react
        },
        languageOptions: {
            parserOptions: react.configs.recommended.parserOptions,
            globals: {
                ...globals.browser
            }
        },
        rules: {
            ...react.configs["jsx-runtime"].rules
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "react-hooks": reactHooks
        },
        extends: ["react-hooks/recommended"]
    },
    {
        files: ["**/*.tsx"],
        ...jsxA11y.flatConfigs.recommended,
        languageOptions: {
            ...jsxA11y.flatConfigs.recommended.languageOptions,
            globals: {
                ...globals.browser
            }
        }
    },
    {
        languageOptions: {
            parserOptions: {
                project: ["tsconfig.node.json", "tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            // Stylistic
            "@stylistic/arrow-parens": ["warn", "as-needed"],
            "@stylistic/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
            "@stylistic/indent": ["warn", 4, { SwitchCase: 1 }],
            "@stylistic/max-statements-per-line": "off",
            "@stylistic/jsx-one-expression-per-line": "off",
            "@stylistic/member-delimiter-style": ["warn", { singleline: { delimiter: "comma" }, multiline: { delimiter: "none" } }],
            "@stylistic/quotes": ["warn", "double", { avoidEscape: true }],
            "@stylistic/space-before-function-paren": ["warn", "always"],
            "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: true }],
            "@stylistic/jsx-max-props-per-line": "off",
            "@stylistic/jsx-indent-props": ["warn", 4],

            // Disabled Rules
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typesript-eslint/no-unnecessary-condition": "off",
            "no-cond-assign": "off",
            "no-return-assign": "off",
            "@typescript-eslint/no-confusing-void-expression": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/prefer-nullish-coalescing": "off",
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/prefer-reduce-type-parameter": "off",
            "@typescript-eslint/no-unnecessary-condition": "off",
            "@typescript-eslint/no-redundant-type-constituents": "off",
            "@typescript-eslint/no-base-to-string": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "jsx-a11y/click-events-have-key-events": "off",
            "react-refresh/only-export-components ": "off" // dev issue, don't really care much for the slight dx benefits
        }
    }
);
