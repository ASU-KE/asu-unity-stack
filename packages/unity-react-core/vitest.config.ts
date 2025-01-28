/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  test: {
    coverage: {
      // 👇 Add this
      exclude: [
         ...coverageConfigDefaults.exclude,
         '**/.storybook/**',
         // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
         '**/*.stories.*',
         // 👇 This pattern must align with the output directory of `storybook build`
         '**/storybook-static/**',
       ],
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@shared": resolve(__dirname, "./../../shared"),
    },
  },
});

declare global {
  interface Window {
    dataLayer: any[];
  }
}
