// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "production" ? "/malone-fashion-shop/" : "/", // Set base for GitHub Pages in production
    build: {
      // These are optional build options for further optimization during deployment
      sourcemap: mode === "development", // Generate source maps in development
      minify: mode === "production", // Minify for production builds
      rollupOptions: {
        output: {
          // Customize chunk names for production if necessary
          chunkFileNames:
            mode === "production"
              ? "assets/[name]-[hash].js"
              : "assets/[name].js",
          entryFileNames:
            mode === "production"
              ? "assets/[name]-[hash].js"
              : "assets/[name].js",
        },
      },
    },
    server: {
      open: true, // Automatically open browser in dev mode
      port: 3000, // Define the port for development server
    },
  };
});
