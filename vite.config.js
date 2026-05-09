import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

//  server: {
//     allowedHosts: ["playmaker-sushi-divinely.ngrok-free.dev"],
//     proxy: {
//       "/api": {
//         // target: "http://localhost:3000",
//         target: "https://playmaker-sushi-divinely.ngrok-free.dev",
//         changeOrigin: true,
//       },
//     },
//   },
