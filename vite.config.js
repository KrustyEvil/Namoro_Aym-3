import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Ayme_My_Love/", // caminho do GitHub Pages
  build: {
    outDir: "docs", // pasta que o GitHub Pages vai servir
  },
});
