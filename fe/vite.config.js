import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    alias: {
      three: "three",
    },
  },
  base: "./", // Hoặc "/your-repo-name/" nếu deploy vào một subdirectory
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
