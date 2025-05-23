import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/books": {
      //  target: "http://localhost:8080",
        target: "http://localhost:5229",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/books/, '/books'),
      },
      "/pulldown": {
        // target: "http://localhost:8080",
        target: "http://localhost:5229",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/books/, '/books'),
      },
      "/authors": {
        // target: "http://localhost:8080",
        target: "http://localhost:5229",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/books/, '/books'),
      },
    },
  },
});
