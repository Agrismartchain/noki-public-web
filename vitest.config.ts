import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    // next-intl re-exports next/navigation; under pnpm's isolated
    // node_modules, Vitest's default (Node-based) SSR resolution of that
    // nested copy can fail to find the "next/navigation" subpath export.
    // Routing it through Vite's own resolver (which is pnpm-aware) fixes it.
    server: {
      deps: {
        inline: [/next-intl/],
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
