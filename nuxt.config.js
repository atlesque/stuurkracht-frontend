import { API } from "./config/endpoints/stuurkrachtApi";

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "stuurkracht-frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/images/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/images/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/images/favicon/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/images/favicon/site.webmanifest",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/style.less"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/vuex-persist.js", mode: "client" },
    { src: "~/plugins/axios.js" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://github.com/nuxt-community/date-fns-module
    [
      "@nuxtjs/date-fns",
      {
        defaultLocale: "nl",
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // https://auth.nuxtjs.org
    "@nuxtjs/auth",
    // https://github.com/nuxt-community/google-gtag-module
    [
      "@nuxtjs/google-gtag",
      {
        id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_KEY,
        // debug: true, // Enable to track in dev mode
      },
    ],
  ],

  // Auth module configuration (https://go.nuxtjs.dev/content)
  auth: {
    strategies: {
      local: {
        token: {
          property: "access_token",
          maxAge: 86400, // 1 day
        },
        endpoints: {
          login: {
            url: API.auth.login,
            method: "post",
            propertyName: "access_token",
          },
          user: {
            url: API.auth.profile,
            method: "get",
            propertyName: "username",
          },
          logout: null, // No logout route in the API
        },
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
