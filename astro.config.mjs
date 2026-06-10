// @ts-check
import { defineConfig, envField } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/lib/reading-time.ts";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://dennispham.me",
  base: "/",
  trailingSlash: "always",
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap(), pagefind()],

  adapter: node({
    mode: "standalone",
  }),

  build: {
    inlineStylesheets: "always", // Prevents FOUC by inlining critical CSS
  },

  env: {
    schema: {
      IMMICH_ALBUM_ID: envField.string({
        context: "server",
        access: "public",
        default: "44fd3c21-d421-4799-a71a-c67525195bae",
      }),
      IMMICH_SHARE_KEY: envField.string({
        context: "server",
        access: "public",
        default:
          "LmrlMxg0sxrV7IlEycHK3qSsTMiwWH1vszZ-0d0pQFR_7kFrw9ByVdibwcbcLT9vBLo",
      }),
      IMMICH_URL: envField.string({
        context: "server",
        access: "public",
        url: true,
        default: "https://photos.axolotl.cloud",
      }),
      VERSION: envField.string({
        context: "client",
        access: "public",
        default: "dev",
      }),
    },
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
          },
        ],
      ],
    }),
    shikiConfig: {
      theme: "material-theme-darker",
    },
  },
});
