import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer(),
    // Gzip
    compression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
    // Brotli
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false,
    }),
  ],
  base: "/",
  server: {
    allowedHosts: ["member-reservoir-office-epinions.trycloudflare.com"],
  },
  optimizeDeps: {
    exclude: ["hls.js"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("hls.js")) {
            return "hls";
          }
          if (id.includes("swiper")) {
            return "swiper";
          }
          if (id.includes("axios")) {
            return "axios";
          }
        },
      },
    },
  },
});
