import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()],
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
