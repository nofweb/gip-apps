// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "nuxt3-notifications",
    'nuxt3-paystack'
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [svgLoader()],
  },
  plugins: [{ src: "~/plugins/getCookie.ts" }, { src: "~/plugins/chartjs.ts" }],

  runtimeConfig: {
    public: {
      paystackPublicKey: process.env.NUXT_PAYSTACK_PUBLIC_KEY, 
      api_url: process.env.API_URL,
    },
  },
});
