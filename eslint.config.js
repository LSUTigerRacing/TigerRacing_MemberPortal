// @ts-check
import { defineConfig, globalIgnores } from "eslint/config";
import svelteConfig from "./frontend/svelte.config.js";

import tseslint from "typescript-eslint";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import stylistic from "@stylistic/eslint-plugin";

import globals from "globals";

export default defineConfig(
    globalIgnores([
        "**/node_modules",
        "**/build",
        "**/.svelte-kit",
        "**/dist",
        "**/drizzle"
    ]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...svelte.configs.recommended,
    stylistic.configs.customize({
        indent: 4,
        semi: true,
        commaDangle: "never"
    }),
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                warnOnUnsupportedTypeScriptVersion: false,
                extraFileExtensions: [".svelte"]
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
            "@stylistic/jsx-curly-newline": "off",

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
            "@typescript-eslint/array-type": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "jsx-a11y/click-events-have-key-events": "off",

            // Svelte
            "svelte/indent": "off"
        }
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                warnOnUnsupportedTypeScriptVersion: false,
                extraFileExtensions: [".svelte"],
                parser: tseslint.parser,
                svelteConfig
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            "no-useless-assignment": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@stylistic/indent": "off",
            "svelte/indent":
             ["warn", {
                 indent: 4,
                 ignoredNodes: [],
                 switchCase: 1,
                 alignAttributesVertically: false
             }]
        }
    }
);
