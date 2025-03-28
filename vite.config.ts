import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Only use the base path for production builds
  base: mode === 'production' ? '/Ext-Dashboard/' : '/',
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true // Ensure fallback to index.html for SPA routing
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        fallback: 'public/404.html'
      }
    }
  }
}));