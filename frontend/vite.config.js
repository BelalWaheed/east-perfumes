import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
  chunkSizeWarningLimit: 800, // optional (just reduces warning noise)
  rollupOptions: {
    output: {
      manualChunks: {
        redux: ["@reduxjs/toolkit", "react-redux"],
        router: ["react-router-dom"],
        qr: ["html5-qrcode"],
        alerts: ["sweetalert2"],
        icons: ["react-icons", "lucide-react"]
      }
    }
  }
}
});
