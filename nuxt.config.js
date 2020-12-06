import { API } from "./config/endpoints/stuurkrachtApi";

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "server",

  // Server configuration (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server)
  server: {
    port: process.env.NUXT_ENV_SERVER_PORT || 3000,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Geef kracht met een kaartje",
    titleTemplate: "%s | Stuurkracht",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Stuur een gratis e-card met persoonlijke boodschap om iemand te steunen",
      },
      {
        hid: "keywords",
        property: "keywords",
        content:
          "gratis e-card, elektronisch kaartje, elektronische kaarten, online kaart, digitale kaart, persoonlijke boodschap, steun, kracht, motivatie",
      },
      /*
        Open Graph Information
      */
      {
        hid: "og:title",
        property: "og:title",
        content: "Geef kracht met een kaartje",
        template: "%s | Stuurkracht",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Stuur een gratis e-card met persoonlijke boodschap om iemand te steunen",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "stuurkracht.be",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://stuurkracht.be/images/og-image.jpg",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/images/favicon/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
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
    redirect: {
      login: "/beheer",
      logout: "/",
      callback: "/beheer",
      home: "/",
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

  // Router config (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router)
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"),
      });
    },
    middleware: "remove-double-slash",
  },
};
