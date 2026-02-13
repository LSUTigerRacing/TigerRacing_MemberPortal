import { defineConfig, type ServerOptions, type UserConfig } from "vite";
import { resolve } from "path";

import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => {
    const isDev = mode === "development";

    const plugins: UserConfig["plugins"] = [
        tailwindcss(),
        sveltekit()
    ];

    const serverOptions: ServerOptions = {
        port: 3000,
        strictPort: true,
        host: "127.0.0.1",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5096",
                changeOrigin: true,
                secure: false
            }
        }
    };

    plugins.push(isDev
        ? devtoolsJson()
        : ViteImageOptimizer({ logStats: true })
    );

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
                $lib: resolve(__dirname, "./src/lib")
            }
        },

        plugins,

        logLevel: isDev ? "info" : "warn",
        clearScreen: false
    };
});
