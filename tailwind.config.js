/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        theme: {
          black: "#515151",
          "gray-light": "#CED1D7",
          gray: "#9CA3AE",
          "gray-dark": "#4E5257",
          "blue-light": "#A0C8E2",
          blue: "#4191C4",
          "blue-dark": "#214962",
          letter: "#FFFAED",
        },
      },
      minHeight: {
        "50vh": "50vh",
      },
      fontFamily: {
        handwritten: ["Kalam", "serif"],
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js",
    ],
  },
};
