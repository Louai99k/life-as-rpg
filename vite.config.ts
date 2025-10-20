import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // resolve: {
  //   alias: [
  //     { find: "types", replacement: path.resolve(__dirname, "src/types") },
  //     { find: "@src", replacement: path.resolve(__dirname, "src") },
  //     { find: "@lib", replacement: path.resolve(__dirname, "src/lib") },
  //     {
  //       find: "@services",
  //       replacement: path.resolve(__dirname, "src/services"),
  //     },
  //   ],
  // },

  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
