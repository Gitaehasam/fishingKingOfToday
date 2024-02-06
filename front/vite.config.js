import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "오늘은 낚시왕",
        short_name: "오늘은 낚시왕",
        start_url: "/",
        icons: [
          {
            src: "./icons/apple-touch-icon-57x57.png",
            sizes: "57x57",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },

          {
            src: "./icons/apple-touch-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
    ],
  },
});
