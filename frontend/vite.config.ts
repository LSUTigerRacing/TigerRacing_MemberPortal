import { defineConfig, type UserConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => {
    const isDev = mode === "development";
    const plugins: UserConfig["plugins"] = [
        react(),
        tailwindcss()
    ];

    if (!isDev) plugins.push(ViteImageOptimizer({ logStats: true }));

    return {
        build: {
            cssMinify: "lightningcss"
        },

        css: {
            devSourcemap: isDev
        },

        json: {
            stringify: true
        },

        resolve: {
            alias: {
                "@": resolve(import.meta.dirname, "./src")
            }
        },

        plugins,

        logLevel: isDev ? "info" : "warn",
        clearScreen: false
    };
});
