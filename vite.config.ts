import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./source"),
    },
  },
  build: {
    // Enable code splitting and tree shaking
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification (esbuild is faster than terser)
    minify: 'esbuild',
    // Remove console.log in production
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    // Enable source maps only in development
    sourcemap: mode === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three'], // Exclude heavy 3D libs from pre-bundling
  },
}));
