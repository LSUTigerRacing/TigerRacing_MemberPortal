import { defineConfig, type ServerOptions, type UserConfig } from "vite";
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

    const serverOptions: ServerOptions = {
        port: 3000,
        strictPort: true,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5109",
                changeOrigin: true,
                secure: false
            }
        }
    };

    if (!isDev) plugins.push(ViteImageOptimizer({ logStats: true }));

    return {
        build: {
            cssMinify: "lightningcss"
        },

        server: serverOptions,
        preview: serverOptions,

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
