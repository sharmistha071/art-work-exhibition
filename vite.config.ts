/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js"
  },
  base: "/artworks/",
  server: {
    host: true,
    strictPort: true,
    port: 8080
  },
  preview: {
    host: true,
    port: 8080
  }
});
