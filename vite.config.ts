import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [  tailwindcss(),react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',       // This allows access from outside your machine
    port: 5173,             // Use a fixed port
    strictPort: true        // Prevent Vite from switching ports if it's taken
    // https: false         // Optional: disable HTTPS if you're not using SSL
  }
})
