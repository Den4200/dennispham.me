import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist/"]),
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintPluginPrettier,
  {
    languageOptions: {
      globals: {
        theme: "readonly",
      },
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]);
