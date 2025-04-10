import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import fs from "fs";
import { defineConfig, transformWithEsbuild } from "vite";

import pkg from "./package.json";
/** @typedef {import('vite').UserConfig} UserConfig */

/** @type {UserConfig} */
const c = {
  root: resolve(__dirname),
  plugins: [
    react(),
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/stories\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2021",
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    cssMinify: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/js/unity-bootstrap-theme.js"),
      formats: ["es", "cjs", "umd"],
      name: 'unityBootstrap',
      fileName: (format) => `js/${format}/unity-bootstrap-theme.js`,
    },
    outDir: "dist",
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), "chart.js"],
      treeshake: true,
      output: {
        globals: {
          "chart.js": "Chart",
        },
        assetFileNames: (assetInfo) => {
          console.log(assetInfo)
          if (assetInfo.originalFileNames && assetInfo.originalFileNames[0]?.includes("bundle")) {
            return "css/unity-bootstrap-theme.bundle.[ext]";
          }
          return "css/[name].[ext]";
        },
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: /.*\.jsx?$/,
    exclude: [],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 9000,
  },
  resolve: {
    alias: [
      { find: '@shared', replacement: path.resolve(__dirname, '../../shared') },
    ],
  },
};

export default defineConfig(c);
