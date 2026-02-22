import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://frysccou-portfolio.vercel.app",
  integrations: [react()],
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      domains: [],
      sizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
  }),
  output: "server",
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "**.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.twimg.com",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
